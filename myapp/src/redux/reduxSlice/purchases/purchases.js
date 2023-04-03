import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const purchases = createSlice({
    name: 'purchases',
    initialState,
    reducers: {
        addPurchase(state, action) {
            return state.concat(action.payload)
        }
    }
})

export const { addPurchase } = purchases.actions

export default purchases.reducer