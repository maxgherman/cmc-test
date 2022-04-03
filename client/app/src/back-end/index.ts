import { magic } from '@src/utils/magic';
import { getConfig } from '@src/utils/config'
import { createRoutesFromChildren } from 'react-router-dom';

export type DisplayProduct = {
    id: string
    name: string
    quantity: number
}

export type CartProduct = {
    id: string
    name: string
    price: number
    totalPrice: number,
    quantity: number
    currency: string
}
export type Cart = {
    id: string
    items: CartProduct[]
    totalItems: number
    total: number
    totalShipping: number
    currency: string
}

export type APICallResult<T> = {
    data?: T
    success: boolean
}

const tryReadJSONbody = async <T>(response: Response): Promise<T | undefined> =>{
    try {
        return await response.json()
    } catch(error) {
        console.error(error)
    }
}

const get = async <T>(url: string, token?: string): Promise<APICallResult<T>> => {
    const config = getConfig();
    const response = await fetch(`${config.serverUrl}${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}`}),
        },
    });

    if(response.status !== 200) {
        return {
            success: false
        }
    }

    return {
        success: true,
        data: await tryReadJSONbody(response)
    }
}

const post = async <TInput, TOutput>(url: string, body?: TInput, token?: string): Promise<APICallResult<TOutput>> => {
    const config = getConfig();
    const response = await fetch(`${config.serverUrl}${url}`, {
        method: 'POST',
        ...(body && { body: JSON.stringify(body) }),
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}`}),
        },
    });

    if(response.status !== 200) {
        return {
            success: false
        }
    }

    return {
        success: true,
        data: await tryReadJSONbody(response)
    }
}

const del = async <TOutput>(url: string, token?: string): Promise<APICallResult<TOutput>> => {
    const config = getConfig();
    const response = await fetch(`${config.serverUrl}${url}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}`}),
        },
    });

    if(response.status !== 200) {
        return {
            success: false
        }
    }

    return {
        success: true,
        data: await tryReadJSONbody(response)
    }
}

export type API = {
    login(email: string): Promise<boolean>
    logout(): Promise<void>
    getProducts(): Promise<APICallResult<DisplayProduct[]>>
    addToCart(product: {productId: string, quantity: number}, cartId?: string): Promise<APICallResult<Cart>>
    removeFromCart(cartId: string, productId: string): Promise<APICallResult<Cart>>
    setCurrency(cartId: string, currency: string): Promise<APICallResult<Cart>>
    checkout(cartId: string): Promise<APICallResult<void>>
}

export const createAPI = () : API => {
    let token: string | undefined;

    return {
        async login(email: string): Promise<boolean> {

            // Trigger Magic link to be sent to user
            let didToken = await magic.auth.loginWithMagicLink({
                email,
            });

            // Validate didToken with server
            const response = await post('/api/login', null, didToken as string);
   
            if(response.success) {
                token = didToken as string
                return true;
            } else {
                token = undefined
                return false
            }
        },

        async logout(): Promise<void> {
            await magic.user.logout()

            if(token) {
                await post('/api/logout', null, token);
            }
        },

        async getProducts(): Promise<APICallResult<DisplayProduct[]>> {
            return await get('/api/products') 
        },

        
        async addToCart(product: {productId: string, quantity: number}, cartId?: string): Promise<APICallResult<Cart>> {
            const url = cartId ? `/api/carts/${cartId}/items`: '/api/carts/items'; 
            
            return await post(url, product)
        },

        async removeFromCart(cartId: string, productId: string): Promise<APICallResult<Cart>> {
            return del(`/api/carts/${cartId}/items/${productId}`)
        },

        async setCurrency(cartId: string, currency: string): Promise<APICallResult<Cart>> {
            return await post(`/api/carts/${cartId}/currency`, { currency })
        },

        async checkout(cartId: string): Promise<APICallResult<void>> {
            console.log(token)
            return await post(`/api/carts/${cartId}/checkout`, null, token)
        }
    }
}