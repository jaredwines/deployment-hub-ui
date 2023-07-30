import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface DevControlsState {
    value: number
    isDevMode: boolean
    isSimulatingLoading: boolean
}

// Define the initial state using that type
const initialState: DevControlsState = {
    value: 0,
    isDevMode: false,
    isSimulatingLoading: false,
}

export const devControlsSlice = createSlice({
    name: 'devControls',
    initialState,
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes.
            // Also, no return statement is required from these functions.
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload
        },
        toggleDevMode: (state) => {
            state.isDevMode = !state.isDevMode
        },
        toggleSimulatingLoading: (state) => {
            state.isSimulatingLoading = !state.isSimulatingLoading
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    increment,
    decrement,
    incrementByAmount,
    toggleDevMode,
    toggleSimulatingLoading,
} = devControlsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.devControls.value
export const selectIsDevMode = (state: RootState) => state.devControls.isDevMode
export const selectIsSimulatingLoading = (state: RootState) => state.devControls.isSimulatingLoading

export default devControlsSlice.reducer