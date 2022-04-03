export type PriceItem = {
    productId: string
    price: number
    currency: string
}

export type Currency = string

export type FinanceService = {
    readonly currency: Currency
    getPriceItems: (productIds: string[]) => PriceItem[]
    calcTotals: (items: { productId: string; quantity: number }[]) => { total: number; shippingTotal: number }
    create: (currency: Currency) => FinanceService
}

const rates: { from: Currency; to: Currency; value: number }[] = [
    { from: 'AUD', to: 'USD', value: 0.6868 },
    { from: 'AUD', to: 'EUR', value: 0.3596 },
    { from: 'USD', to: 'EUR', value: 0.7413 },
]

const priceItems: PriceItem[] = [
    {
        productId: '6d7272dd-d49b-4870-a9e7-3763782755ed',
        price: 11.17,
        currency: 'AUD',
    },
    {
        productId: '7b470d7f-2be8-482c-85c5-b4391907719a',
        price: 3.99,
        currency: 'AUD',
    },
    {
        productId: '2b303ee7-7e63-4bb0-9c3b-a4c29c30bb7e',
        price: 0.79,
        currency: 'AUD',
    },
    {
        productId: '2f3d982d-5b7a-4d8f-a39f-50546bb5255d',
        price: 2.51,
        currency: 'AUD',
    },
    {
        productId: 'c40f9fc0-aa1d-4b4d-9bca-151f22bfe2eb',
        price: 23.0,
        currency: 'AUD',
    },
]

const round = (value: number, decimalPoints = 2) => Number(value.toFixed(decimalPoints))

const getConversionRate = (from: Currency, to: Currency): number | void => {
    const result = rates.filter((item) => item.from === from && item.to === to)[0]
    if (!result) {
        throw new Error('rate not found')
    }

    return result.value
}

export const financeService = (currency: Currency = 'AUD'): FinanceService => {
    return {
        currency,

        getPriceItems(productIds: string[]): PriceItem[] {
            return priceItems
                .filter((item) => productIds.includes(item.productId))
                .map((item) => {
                    const copy = { ...item }
                    if (item.currency === currency) {
                        return copy
                    }

                    const rate = getConversionRate(item.currency, currency) as number
                    copy.currency = currency
                    copy.price = round(copy.price * rate)

                    return copy
                })
        },

        calcTotals(products: { productId: string; quantity: number }[]): { total: number; shippingTotal: number } {
            const total = products.reduce((acc, curr) => {
                const priceItem = priceItems.filter((item) => item.productId === curr.productId)[0]
                if (!priceItem) {
                    return acc
                }
                return acc + curr.quantity * priceItem.price
            }, 0)

            const shippingTotal = total < 50 ? 10 : 20

            const rate = currency === 'AUD' ? 1 : (getConversionRate('AUD', currency) as number)

            return {
                total: round(total * rate),
                shippingTotal: round(shippingTotal * rate),
            }
        },

        create(currency: string): FinanceService {
            return financeService(currency)
        },
    }
}
