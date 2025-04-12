import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    uid: string | null;
    email: string | null;
    isLoggedin: boolean;
}

const getLocalStorage = (key: string) => {
    try {
        return localStorage.getItem(key)
    } catch (error) {
        console.error(error)
        return null;
    }
}

const initialState: AuthState = {
    uid: getLocalStorage("uid"),
    email: getLocalStorage("email"),
    isLoggedin: getLocalStorage("isLoggedin") === "true",
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: { payload: { uid: string; email: string | null } }) => {
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.isLoggedin = true;
            
            localStorage.setItem("uid", action.payload.uid)
            localStorage.setItem("email", action.payload.email || "")
            localStorage.setItem("isLoggedin", "true")
        },
        logoutUser: (state) => {
            state.uid = null;
            state.email = null;
            state.isLoggedin = false;
            localStorage.removeItem("uid")
            localStorage.removeItem("email")
            localStorage.removeItem("isLoggedin")
        }
    }
})

export const { setUser, logoutUser } = authSlice.actions;
export default authSlice.reducer