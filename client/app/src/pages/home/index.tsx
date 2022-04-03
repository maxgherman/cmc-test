import { useContext, useEffect, useState } from 'react'
import { APIContext } from '@src/context/api-context'
import { CartContext } from '@src/context/cart-context'
import type { DisplayProduct } from '@src/back-end'
import { ProductRow } from './product-row'

export const Home = () => {
    const api = useContext(APIContext)
    const { cart, setCart } = useContext(CartContext)
    const [products, setProducts] = useState<DisplayProduct[]>([])
    
    useEffect(() => {
        api.getProducts()
        .then(products => {
            if(products.success) {
                setProducts(products.data as DisplayProduct[])
            }
        })
    }, [])

    const handleAddToCart = async (productId: string, amount:  number) => {
        const result = await api.addToCart({ productId, quantity: amount }, cart?.id)
        if(result.success) {
            setCart(result.data)
        } 
    }

    return (
        <div>
            <h2>Products</h2>
            <div>
                <table style={{ width: '100%', paddingTop: '50px' }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Add to cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(item => (
                            <ProductRow
                                key={item.id}
                                product={item}
                                addProduct={(amount) => handleAddToCart(item.id, amount)}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}