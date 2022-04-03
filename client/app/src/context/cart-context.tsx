import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import type { Cart } from '@src/back-end'

export type CardContextData = {
    cart?: Cart,
    setCart: Dispatch<SetStateAction<Cart | undefined>>
}

export const CartContext = createContext<CardContextData>({} as CardContextData);
export const CartConsumer = CartContext.Consumer;
export const CartProvider: React.FC = ({ children }) => {
    const [cart, setCart] = useState<Cart>()

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}
