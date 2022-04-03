import { ChangeEventHandler, useState } from 'react'
import type { DisplayProduct } from '@src/back-end'

export const ProductRow = (
    { product, addProduct }:
    { product: DisplayProduct; addProduct: (amount: number) => void }) => {

        const [amount, setAmount] = useState('')

        const handleAmountChange: ChangeEventHandler<HTMLInputElement> = (e) => {
            if(isNaN(Number(e.target.value))) {
                return
            }
            
            setAmount(e.target.value);
        }

        const handleAdd = () => {
            const value = Number(amount)
            if(isNaN(value) || value <= 0) {
                return
            }

            addProduct(value)
        }

        return (
            <tr style={{ lineHeight: '35px'}}>
                <td style={{ width: '50%', textAlign: 'center'}}>{product.name}</td>
                <td style={{ maxWidth: '25%', textAlign: 'center'}}>
                    <input
                        style={{ width: '50px' }}
                        type="number" min="1"
                        max={product.quantity}
                        value={amount}
                        onChange={handleAmountChange}
                    />
                </td>
                <td style={{ width: '25%', textAlign: 'center'}}>
                    <button onClick={handleAdd}>Add</button>
                </td> 
            </tr>
        )

}