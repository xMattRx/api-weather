import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: undefined,
    nextDays: undefined,
    error: undefined
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        getData: (state, action) => {
            state.value = action.payload
        },
        nextDays: (state, action) => {
            state.nextDays = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { getData } = dataSlice.actions
export const { nextDays } = dataSlice.actions
export const { setError } = dataSlice.actions

export default dataSlice.reducer