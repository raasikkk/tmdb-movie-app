import { useEffect } from "react";
import auth from "../config/firebase";
import { logoutUser, setUser } from "../features/authSlice/authSlice";
import { clearWatchlist, fetchWatchlist } from "../features/watchlistSlice/watchlistSlice"
import { useAppDispatch } from "../hooks/hooks";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(setUser({
                    uid: user.uid,
                    email: user.email
                }))
                dispatch(fetchWatchlist())
            } else {
                dispatch(logoutUser())
                dispatch(clearWatchlist())
            }
        });

        const interval = setInterval(async () => {
            const user = auth.currentUser;
            if (user) {
                await user.getIdToken(true)
            }
        }, 55 * 60 * 1000)

        return () => {
            unsubscribe();
            clearInterval(interval)
        }
    }, [dispatch])

    return <>{children}</>
}

export default AuthProvider