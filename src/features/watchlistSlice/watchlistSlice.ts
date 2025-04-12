import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { RootState } from "../../store";

interface WatchlistState {
    items: number[];
    status: "idle" | "loading" | "succeeded" | "failed"
}

const initialState: WatchlistState = {
    items: [],
    status: "idle"
}

export const fetchWatchlist = createAsyncThunk(
    "watchlist/fetch",
    async (_, { getState }) => {
        const state = getState() as RootState;
        const userId = state.auth.uid;

        if (!userId) return []

        const watchListRef = collection(db, "users", userId, "watchlist");
        const snapshot = await getDocs(watchListRef)
        return snapshot.docs.map(doc => parseInt(doc.id))
    }
)

export const toggleBookmark = createAsyncThunk(
    "watchlist/toggle",
    async (movieId: number, { getState }) => {
        const state = getState() as RootState;
        const userId = state.auth.uid;

        if (!userId) throw new Error("User not authenticated");

        const movieRef = doc(db, "users", userId, "watchlist", movieId.toString());

        if (state.watchlist.items.includes(movieId)) {
            await deleteDoc(movieRef)
            return movieId;
        } else {
            await setDoc(movieRef, { timestamp: new Date().toISOString() })
            return movieId
        }
    }
)

const watchListSlice = createSlice({
    name: 'watchlist',
    initialState,
    reducers: {
        clearWatchlist: (state) => {
            state.items = [];
            state.status = "idle";
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchWatchlist.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(fetchWatchlist.fulfilled, (state, action) => {
            state.status = "succeeded"
            state.items = action.payload
        })
        .addCase(toggleBookmark.fulfilled, (state, action) => {
            const movieId = action.payload;
            const index = state.items.indexOf(movieId)
            if (index > -1) {
                state.items.splice(index, 1);
            } else {
                state.items.push(movieId)
            }
        })
    }
})

export const { clearWatchlist } = watchListSlice.actions
export default watchListSlice.reducer