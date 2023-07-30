import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface DevControlsState {
    value: number
    isDevMode: boolean
    isSimulatingLoading: boolean
    isSimulatingLogs: boolean
}

// Define the initial state using that type
const initialState: DevControlsState = {
    value: 0,
    isDevMode: false,
    isSimulatingLoading: false,
    isSimulatingLogs: false,
}

export const devControlsSlice = createSlice({
    name: 'devControls',
    initialState,
    reducers: {
        toggleDevMode: (state) => {
            state.isDevMode = !state.isDevMode
        },
        toggleSimulatingLoading: (state) => {
            state.isSimulatingLoading = !state.isSimulatingLoading
        },
        toggleSimulatingLogs: (state) => {
            state.isSimulatingLogs = !state.isSimulatingLogs
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    toggleDevMode,
    toggleSimulatingLoading,
    toggleSimulatingLogs,
} = devControlsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectIsDevMode = (state: RootState) => state.devControls.isDevMode
export const selectIsSimulatingLoading = (state: RootState) => state.devControls.isSimulatingLoading
export const selectIsSimulatingLogs = (state: RootState) => state.devControls.isSimulatingLogs

export default devControlsSlice.reducer