import type { InventoryService } from './inventory-service'

export type Product = {
    id: string
    name: string
}

export type DisplayProduct = Product & {
    quantity: number
}

export type ProductService = {
    getDisplayProducts: () => DisplayProduct[]
    getProduct: (productId: string) => Product | undefined
}

const products: Product[] = [
    {
        id: '6d7272dd-d49b-4870-a9e7-3763782755ed',
        name: 'Product 1',
    },
    {
        id: '7b470d7f-2be8-482c-85c5-b4391907719a',
        name: 'Product 2',
    },
    {
        id: '2b303ee7-7e63-4bb0-9c3b-a4c29c30bb7e',
        name: 'Product 3',
    },
    {
        id: '2f3d982d-5b7a-4d8f-a39f-50546bb5255d',
        name: 'Product 4',
    },
    {
        id: 'c40f9fc0-aa1d-4b4d-9bca-151f22bfe2eb',
        name: 'Product 5',
    },
]

export const productService = (inventoryService: InventoryService): ProductService => {
    return {
        getDisplayProducts(): DisplayProduct[] {
            return inventoryService.getItems(products.map((item) => item.id)).map((inventoryItem) => ({
                id: inventoryItem.productId,
                quantity: inventoryItem.quantity,
                name: products.filter((p) => p.id === inventoryItem.productId)[0].name,
            }))
        },

        getProduct(productId: string): Product | undefined {
            return products.filter((item) => item.id === productId)[0]
        },
    }
}
