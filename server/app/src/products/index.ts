import express from 'express'
import type { Controller } from '../routes/controller'
import { list } from '../routes'
import type { ProductService } from './product-service'

export const productsController = (productService: ProductService): Controller => {
    const router = express.Router()

    // get product list
    // /api/products
    router.get(list.products, (_, response) => {
        const data = productService.getDisplayProducts()

        response.status(200).json(data)
    })

    return {
        path: '/',
        router,
    }
}
