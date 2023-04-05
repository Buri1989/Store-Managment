import { createSlice } from '@reduxjs/toolkit'


const initialState = [
    {
        ID: '1',
        Name: 'Air Jordan3',
        Price: 900,
        Quantity: '23'
    },
    {
        ID: '2',
        Name: 'Air Jordan1',
        Price: 1500,
        Quantity: '10'
    },

]

const products = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct(state, action) {
            return state.concat(action.payload)
        },
        updateProduct(state, action) {
            let product = [...state]
            product = product.map(index => {
                if (Number(index.ID) === Number(action.payload.ID)) {
                    return action.payload
                } else {
                    return index
                }
            })
            return product
        },
        deleteProduct(state, action) {
            const start = [...state.slice(0, action.payload - 1)]
            const product = [...state.slice(action.payload)]

            return start.concat(product)
        }
    }
})

export const { addProduct, updateProduct, deleteProduct } = products.actions

export default products.reducer
