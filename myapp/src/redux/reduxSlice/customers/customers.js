import { createSlice } from '@reduxjs/toolkit'


const initialState = [
    {
        ID: '1',
        FirstName: 'Amos',
        LastName: 'Levi',
        City: 'Tel Aviv'
    },
    {
        ID: '2',
        FirstName: 'Vadim',
        LastName: 'Cohen',
        City: 'Ashdod'
    },

]

const customers = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        addCustomer(state, action) {
            return state.concat(action.payload)
        },
        updateCustomer(state, action) {
            let customer = [...state]
            customer = customer.map(index => {
                if (Number(index.ID) === Number(action.payload.ID)) {
                    return action.payload
                } else {
                    return index
                }
            })
            return customer
        },
        deleteCustomer(state, action) {
            const start = [...state.slice(0, action.payload - 1)]
            const customer = [...state.slice(action.payload)]

            return start.concat(customer)
        }
    }
})

export const { addCustomer, updateCustomer, deleteCustomer } = customers.actions

export default customers.reducer