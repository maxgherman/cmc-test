import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '@src/context/user-context';
import { APIContext } from '@src/context/api-context'
import { CartContext } from '@src/context/cart-context'

export const Checkout = () => {
    const { user } = useContext(UserContext);
    const api = useContext(APIContext);
    const { cart, setCart } = useContext(CartContext);
    const navigate = useNavigate()
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    }, [user])

    const handleCheckout = async () => {
        if(!cart) {
            return
        }

        const result = await api.checkout(cart.id)
        setSuccess(result.success);

        if(result.success) {
            setCart(undefined)
        }
    }

    return (
        <div>
            <h2>Checkout</h2>
            {!success && (
                <div>
                    <button onClick={handleCheckout} >Checkout</button>
                </div>
            )}

            {success && (
                <div>
                    <h3>Thank You!</h3>
                </div>
            )}
        </div>
    )
}