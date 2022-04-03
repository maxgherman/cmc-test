import { App } from './app'
import { userController } from './users'
import { productsController } from './products'
import { cartController } from './cart'
import { productService } from './products/product-service'
import { inventoryService } from './products/inventory-service'
import { financeService } from './finance/finance-service'
import { cartService } from './cart/cart-service'

const inventory = inventoryService()
const finance = financeService()
const products = productService(inventory)
const cart = cartService(finance, products, inventory)

const app = new App([userController(), productsController(products), cartController(cart)])

app.listen()
