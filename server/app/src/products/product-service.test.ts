import { describe, it, expect } from 'vitest'
import { productService } from './product-service'
import type { InventoryService } from './inventory-service'

const withDefaults = () => {
    const inventoryService = {
        update() {
            1 + 1
        },
    } as unknown as InventoryService

    return productService(inventoryService)
}

describe('product-service', () => {
    it('getProduct returns product', () => {
        const service = withDefaults()

        expect(service.getProduct('6d7272dd-d49b-4870-a9e7-3763782755ed')).toEqual({
            id: '6d7272dd-d49b-4870-a9e7-3763782755ed',
            name: 'Product 1',
        })
    })

    it('getDisplayProducts returns products', () => {
        const inventoryService = {
            getItems() {
                return [
                    {
                        productId: '6d7272dd-d49b-4870-a9e7-3763782755ed',
                        quantity: 10,
                    },
                    {
                        productId: '7b470d7f-2be8-482c-85c5-b4391907719a',
                        quantity: 3,
                    },
                ]
            },
        } as unknown as InventoryService

        const service = productService(inventoryService)

        expect(service.getDisplayProducts()).toEqual([
            {
                id: '6d7272dd-d49b-4870-a9e7-3763782755ed',
                name: 'Product 1',
                quantity: 10,
            },
            {
                id: '7b470d7f-2be8-482c-85c5-b4391907719a',
                name: 'Product 2',
                quantity: 3,
            },
        ])
    })
})
