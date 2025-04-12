import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import authReducer  from './features/authSlice/authSlice'
import { tmdbApi } from './features/movieSlice/movieSlice'
import watchlistReducer from "./features/watchlistSlice/watchlistSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        watchlist: watchlistReducer,
        [tmdbApi.reducerPath]: tmdbApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(tmdbApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch