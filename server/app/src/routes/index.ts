export const list = {
    login: '/api/login', // user login
    logout: '/api/logout', // user logout
    products: '/api/products', // display products
    cart: '/api/carts/:id', // display cart
    cartItems: '/api/carts/:id/items', // add item
    cartCurrency: '/api/carts/:id/currency',
    cartItemsNoCart: '/api/carts/items', // add item
    cartItem: '/api/carts/:cartId/items/:id', // remove
    checkout: {
        path: '/api/carts/:id/checkout', // user checkout
        regex: /\/api\/carts\/.*\/checkout/gi,
    },
}
