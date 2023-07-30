import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface ResultsState {
    wasFailure: boolean
    wasSuccessful: boolean
}

// Define the initial state using that type
const initialState: ResultsState = {
    wasFailure: false,
    wasSuccessful: false,
}

export const resultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        updateWasFailure: (state, action: PayloadAction<boolean>) => {
            state.wasFailure = action.payload
        },
        updateWasSuccessful: (state, action: PayloadAction<boolean>) => {
            state.wasSuccessful = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    updateWasFailure,
    updateWasSuccessful
} = resultsSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectIsDevMode = (state: RootState) => state.results.isDevMode
export const selectWasFailure = (state: RootState) => state.results.wasFailure
export const selectWasSuccessful = (state: RootState) => state.results.wasSuccessful

export default resultsSlice.reducer