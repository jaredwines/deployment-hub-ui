import { configureStore } from '@reduxjs/toolkit'
import devControlsReducer from './slices/devControlsSlice'
import resultsReducer from './slices/resultsSlice'

const store = configureStore({
    reducer: {
        devControls: devControlsReducer,
        results: resultsReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;