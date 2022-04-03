import { describe, it, expect } from 'vitest'
import { inventoryService } from './inventory-service'

const service = inventoryService()

describe('inventory-service', () => {
    it('getItem returns item', () => {
        const item = service.getItem('2f3d982d-5b7a-4d8f-a39f-50546bb5255d')
        expect(item).toBeTruthy()
        expect(item?.quantity).toBe(7)
    })

    it('getItem returns undefined', () => {
        const item = service.getItem('123')
        expect(item).toBeFalsy()
    })

    it('getItems returns items', () => {
        const items = service.getItems(['2f3d982d-5b7a-4d8f-a39f-50546bb5255d', '6d7272dd-d49b-4870-a9e7-3763782755ed'])
        expect(items).toHaveLength(2)
    })

    it('update updates quantity', () => {
        const itemId = '6d7272dd-d49b-4870-a9e7-3763782755ed'
        let item = service.getItem(itemId)
        expect(item?.quantity).toBe(10)

        const updatedItem = service.update(item?.productId as string, 3)
        expect(updatedItem.quantity).toBe(7)

        item = service.getItem(itemId)
        expect(item?.quantity).toBe(7)
    })
})
