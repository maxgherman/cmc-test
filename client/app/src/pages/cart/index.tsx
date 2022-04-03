import { ChangeEventHandler, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { APIContext } from '@src/context/api-context'
import { CartContext } from '@src/context/cart-context'

export const Cart = () => {
    const api = useContext(APIContext)
    const { cart, setCart } = useContext(CartContext)
    const [ currency, setCurrency ] = useState('AUD');
    
    const handleRemoveItem = async (productId: string) => {
        if(!cart) {
            return;
        } 
        
        const result  = await api.removeFromCart(cart?.id as string, productId)
        if(result.success) {
            setCart(result.data)
        }
    }

    const handleCurrencyChange: ChangeEventHandler<HTMLSelectElement> = async (e) => {
        if(!cart) {
            return
        }

        const currency = e.target.value
        const result = await api.setCurrency(cart.id, currency)

        if(result.success) {
            setCurrency(currency)
            setCart(result.data);
        }
    }

    if(!cart) {
        return null
    }

    if(cart.totalItems <= 0) {
        return (
            <div>
                <h2>Cart</h2>
                <Link to={'/'}>Home</Link>
            </div>
        )
    }
    return (
        <div>
            <h2>Cart</h2>
            <div>
            Currency:{' '}
            <select value={currency} onChange={handleCurrencyChange}>
                    <option>AUD</option>
                    <option>USD</option>
                    <option>EUR</option>
                </select>
            </div>
            <div>
                <table style={{ width: '100%', paddingTop: '50px' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(cart?.items || []).map(item => (
                            <tr key={item.id} style={{ lineHeight: '35px'}}>
                                <td style={{ width: '50%', textAlign: 'center'}}>{item.name}</td>
                                <td style={{ width: '20%', textAlign: 'center'}}>{item.quantity}</td>
                                <td style={{ width: '30%', textAlign: 'center'}}>{item.price} / {item.totalPrice}</td>
                                <td style={{ width: '25%', textAlign: 'center'}}>
                                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                </td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <h5>Total: {cart?.total} {cart.currency}</h5>
                    <h5>Total shipping: {cart?.totalShipping} {cart.currency}</h5>
                    <h5>Grand total: {(cart?.total + cart?.totalShipping).toFixed(2)} {cart.currency}</h5>
                </div>
            </div>
            <h3>
                <Link to={'/checkout'}>Checkout</Link>
            </h3>
        </div>
    )
}