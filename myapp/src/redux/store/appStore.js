import { configureStore } from '@reduxjs/toolkit'
import customers from '../reduxSlice/customers/customers'
import products from '../reduxSlice/products/products'
import purchases from '../reduxSlice/purchases/purchases'


const appStore = configureStore(
    {
        reducer:
        {
            customers: customers,
            products: products,
            purchases: purchases
        }
    }
)

export default appStore