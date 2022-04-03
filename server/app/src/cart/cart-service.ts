import { v4 as guid } from 'uuid'
import type { Product, ProductService } from '../products/product-service'
import type { FinanceService } from '../finance/finance-service'
import type { InventoryService } from '../products/inventory-service'

export type CartProduct = Product & {
    price: number
    quantity: number
    currency: string
    totalPrice: number
}

type CartStore = {
    id: string
    items: Map<string, CartProduct>
    total: number
    totalShipping: number
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

export type CartService = {
    getCart(cartId: string): Cart | undefined
    addItem(productId: string, quantity: number, cartId?: string): Cart
    removeItem(productId: string, cartId: string): Cart
    setCurrency(currency: string, cartId: string): Cart
    removeCart(cartId: string): void
}

const carts: Map<string, CartStore> = new Map()

const updateCart = (cart: CartStore, financeService: FinanceService): CartStore => {
    if (cart.items.size <= 0) {
        cart.total = 0
        cart.totalShipping = 0

        return cart
    }

    const productIds = [...cart.items.keys()]
    const priceItems = financeService.getPriceItems(productIds)

    priceItems.forEach((priceItem) => {
        const cartItem = cart.items.get(priceItem.productId) as CartProduct
        cartItem.price = priceItem.price
        cartItem.currency = priceItem.currency
        cartItem.totalPrice = Number((cartItem.price * cartItem.quantity).toFixed(2))
    })

    const financeProducts = [...cart.items.values()].map((item) => ({ productId: item.id, quantity: item.quantity }))
    const { total, shippingTotal } = financeService.calcTotals(financeProducts)
    cart.total = total
    cart.totalShipping = shippingTotal
    cart.currency = financeService.currency

    return cart
}

const toCart = (cart: CartStore): Cart => {
    const items = [...cart.items.values()]
    const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0)

    return {
        id: cart.id,
        items,
        totalItems,
        total: cart.total,
        currency: cart.currency,
        totalShipping: cart.totalShipping,
    }
}

export const cartService = (
    financeService: FinanceService,
    productService: ProductService,
    inventoryService: InventoryService,
): CartService => {
    const financialService = {
        value: financeService,
    }

    return {
        getCart(cartId: string): Cart | undefined {
            if (!carts.has(cartId)) {
                return
            }

            const cart = carts.get(cartId) as CartStore

            updateCart(cart, financialService.value)

            return toCart(cart)
        },

        addItem(productId: string, quantity: number, cartId?: string): Cart {
            if (quantity <= 0) {
                throw new Error('quantity <= 0')
            }

            let cart: CartStore

            if (cartId) {
                if (!carts.has(cartId)) {
                    throw new Error('cart not found')
                }

                cart = carts.get(cartId) as CartStore
            } else {
                cart = {
                    id: guid(),
                    items: new Map(),
                    currency: 'AUD',
                    total: 0,
                    totalShipping: 0,
                }

                carts.set(cart.id, cart)
            }

            let cartItem: CartProduct
            if (!cart.items.has(productId)) {
                const product = productService.getProduct(productId)
                if (!product) {
                    throw new Error('product not found')
                }

                cartItem = {
                    id: product.id,
                    name: product.name,
                    quantity,
                    price: 0,
                    totalPrice: 0,
                    currency: '',
                }
            } else {
                cartItem = cart.items.get(productId) as CartProduct
                cartItem.quantity += quantity
                cartItem.price = 0
                cartItem.currency = ''
            }

            inventoryService.update(productId, quantity)

            cart.items.set(productId, cartItem)

            updateCart(cart, financialService.value)

            return toCart(cart)
        },

        removeItem(productId: string, cartId: string): Cart {
            if (!carts.has(cartId)) {
                throw new Error('cart not found')
            }

            const cart = carts.get(cartId) as CartStore
            if (!cart.items.has(productId)) {
                throw new Error('product not fond')
            }

            const cartItem = cart.items.get(productId) as CartProduct
            inventoryService.update(productId, -1 * cartItem?.quantity)

            cart.items.delete(productId)

            updateCart(cart, financialService.value)

            return toCart(cart)
        },

        setCurrency(currency: string, cartId: string): Cart {
            if (!carts.has(cartId)) {
                throw new Error('cart not found')
            }

            const cart = carts.get(cartId) as CartStore

            financialService.value = financialService.value.create(currency)
            updateCart(cart, financialService.value)

            return toCart(cart)
        },

        removeCart(cartId: string): void {
            if (!carts.has(cartId)) {
                throw new Error('cart not found')
            }

            const cart = carts.get(cartId) as CartStore
            cart.items.delete(cartId)
        },
    }
}
