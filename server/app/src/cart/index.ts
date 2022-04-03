import express from 'express'
import type { Controller } from '../routes/controller'
import { list } from '../routes'
import type { CartService } from './cart-service'
import { logger } from '../utils/logger'

export const cartController = (cartService: CartService): Controller => {
    const router = express.Router()

    // get cart
    // /api/carts/:id
    router.get(list.cart, (request, response) => {
        const data = cartService.getCart(request.params.id)

        if (!data) {
            response.status(404).end()
            return
        }

        response.status(200).json(data)
    })

    // checkout
    // '/api/carts/:id/checkout',
    router.post(list.checkout.path, (request, response) => {
        try {
            const data = cartService.removeCart(request.params.id)

            response.status(200).json(data)
        } catch (error) {
            logger.error((error as Error).message)
            response.status(422).end()
        }
    })

    // add item
    // /api/carts/:id/items
    router.post(list.cartItems, (request, response) => {
        try {
            const cartId = request.params.id
            const { productId, quantity }: { productId: string; quantity: number } = request.body
            const data = cartService.addItem(productId, quantity, cartId)

            response.status(200).json(data)
        } catch (error) {
            logger.error((error as Error).message)
            response.status(422).end()
        }
    })

    // create cart and add item
    // /api/carts/items
    router.post(list.cartItemsNoCart, (request, response) => {
        try {
            const { productId, quantity }: { productId: string; quantity: number } = request.body

            const data = cartService.addItem(productId, quantity)
            response.status(200).json(data)
        } catch (error) {
            logger.error((error as Error).message)
            response.status(422)
        }
    })

    // remove item
    // /api/carts/:cartId/items/:id
    router.delete(list.cartItem, (request, response) => {
        try {
            const cartId = request.params.cartId
            const productId = request.params.id
            const data = cartService.removeItem(productId, cartId)

            response.status(200).json(data)
        } catch (error) {
            logger.error((error as Error).message)
            response.status(422)
        }
    })

    // set cart currency
    // /api/carts/:id/currency
    router.post(list.cartCurrency, (request, response) => {
        try {
            const cartId = request.params.id
            const { currency }: { currency: string } = request.body

            const data = cartService.setCurrency(currency, cartId)

            response.status(200).json(data)
        } catch (error) {
            logger.error((error as Error).message)
            response.status(422)
        }
    })

    return {
        path: '/',
        router,
    }
}
