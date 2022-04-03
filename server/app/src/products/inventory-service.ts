export type InventoryItem = {
    productId: string
    quantity: number
}

export type InventoryService = {
    getItem: (productId: string) => InventoryItem | undefined
    getItems: (productIds: string[]) => InventoryItem[]
    update: (productId: string, quantityDelta: number) => InventoryItem
}

const inventory: InventoryItem[] = [
    {
        productId: '6d7272dd-d49b-4870-a9e7-3763782755ed',
        quantity: 10,
    },
    {
        productId: '7b470d7f-2be8-482c-85c5-b4391907719a',
        quantity: 3,
    },
    {
        productId: '2b303ee7-7e63-4bb0-9c3b-a4c29c30bb7e',
        quantity: 5,
    },
    {
        productId: '2f3d982d-5b7a-4d8f-a39f-50546bb5255d',
        quantity: 7,
    },
    {
        productId: 'c40f9fc0-aa1d-4b4d-9bca-151f22bfe2eb',
        quantity: 1,
    },
]

export const inventoryService = (): InventoryService => {
    return {
        getItem(productId: string) {
            return inventory.filter((item) => item.productId === productId && item.quantity > 0)[0]
        },

        getItems(productIds: string[]): InventoryItem[] {
            return inventory.filter((item) => productIds.includes(item.productId) && item.quantity > 0)
        },
        update(productId: string, quantityDelta: number): InventoryItem {
            const item = this.getItem(productId)

            if (!item) {
                throw new Error('unknown product')
            }

            const quantity = item.quantity - quantityDelta
            if (quantity < 0) {
                throw new Error(`negative quantity update: ${quantity}`)
            }

            item.quantity = quantity

            return item
        },
    }
}
