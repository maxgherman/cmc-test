import { describe, it, expect } from 'vitest'
import { financeService } from './finance-service'

const service = financeService()

describe('financeService', () => {
    it('getPriceItems return price items', () => {
        const priceItems = service.getPriceItems([
            '2f3d982d-5b7a-4d8f-a39f-50546bb5255d',
            '6d7272dd-d49b-4870-a9e7-3763782755ed',
        ])

        expect(priceItems).toEqual([
            {
                currency: 'AUD',
                price: 11.17,
                productId: '6d7272dd-d49b-4870-a9e7-3763782755ed',
            },
            {
                currency: 'AUD',
                price: 2.51,
                productId: '2f3d982d-5b7a-4d8f-a39f-50546bb5255d',
            },
        ])
    })

    it('getPriceItems returns empty', () => {
        const items = service.getPriceItems(['123', '4567'])
        expect(items).toHaveLength(0)
    })

    it('calcTotals returns totals with low shipping', () => {
        const result = service.calcTotals([
            {
                productId: '2f3d982d-5b7a-4d8f-a39f-50546bb5255d',
                quantity: 3,
            },
            {
                productId: '6d7272dd-d49b-4870-a9e7-3763782755ed',
                quantity: 1,
            },
        ])

        expect(result).toEqual({
            total: 18.7,
            shippingTotal: 10,
        })
    })

    it('calcTotals returns totals with high shipping', () => {
        const result = service.calcTotals([
            {
                productId: '2f3d982d-5b7a-4d8f-a39f-50546bb5255d',
                quantity: 3,
            },
            {
                productId: '6d7272dd-d49b-4870-a9e7-3763782755ed',
                quantity: 10,
            },
        ])

        expect(result).toEqual({
            total: 119.23,
            shippingTotal: 20,
        })
    })

    it('create create new instance', () => {
        const newInstance = service.create('EUR')

        expect(newInstance.currency).toBe('EUR')
        expect(newInstance !== service).toBe(true)
    })
})
