import { describe, it, expect } from 'vitest'
import { cartService } from './cart-service'
import type { FinanceService } from '../finance/finance-service'
import type { InventoryService } from '../products/inventory-service'
import type { ProductService } from '../products/product-service'

const withDefaults = () => {
    const financeService = {
        getPriceItems() {
            return []
        },
        calcTotals() {
            return { total: 100, shippingTotal: 10 }
        },
        create() {
            return { ...financeService, currency: 'EUR' }
        },
    } as unknown as FinanceService
    const productService = {
        getProduct(productId: string) {
            return {
                id: productId,
                name: 'test',
            }
        },
    } as ProductService
    const inventoryService = {
        update() {
            1 + 1
        },
    } as unknown as InventoryService

    return cartService(financeService, productService, inventoryService)
}

describe('cart-service', () => {
    it('addItem adds item to new cart', () => {
        const service = withDefaults()
        expect(service.addItem('7b470d7f-2be8-482c-85c5-b4391907719a', 1).items).toEqual([
            {
                currency: '',
                id: '7b470d7f-2be8-482c-85c5-b4391907719a',
                name: 'test',
                price: 0,
                quantity: 1,
                totalPrice: 0,
            },
        ])
    })

    it('addItem adds item to cart', () => {
        const service = withDefaults()
        const cart = service.addItem('7b470d7f-2be8-482c-85c5-b4391907719a', 1)
        expect(service.addItem('7b470d7f-2be8-482c-85c5-b4391907719a', 1, cart.id).items).toEqual([
            {
                currency: '',
                id: '7b470d7f-2be8-482c-85c5-b4391907719a',
                name: 'test',
                price: 0,
                quantity: 2,
                totalPrice: 0,
            },
        ])
    })

    it('getCart return no cart', () => {
        const financeService = {} as FinanceService
        const productService = {} as ProductService
        const inventoryService = {} as InventoryService
        const service = cartService(financeService, productService, inventoryService)

        expect(service.getCart('123')).toBe(undefined)
    })

    it('removeItem removes item from cart', () => {
        const service = withDefaults()
        const cart = service.addItem('7b470d7f-2be8-482c-85c5-b4391907719a', 1)

        expect(service.removeItem('7b470d7f-2be8-482c-85c5-b4391907719a', cart.id).items).toEqual([])
    })

    it('setCurrency sets currency', () => {
        const service = withDefaults()
        const cart = service.addItem('7b470d7f-2be8-482c-85c5-b4391907719a', 1)
        expect(service.setCurrency('EUR', cart.id).currency).toBe('EUR')
    })
})
