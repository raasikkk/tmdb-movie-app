import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import { tmdbApi } from './features/movieSlice/movieSlice'
// import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [tmdbApi.reducerPath]: tmdbApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(tmdbApi.middleware)
})

// setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch