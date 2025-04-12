import { logoutUser } from "../features/authSlice/authSlice"
import auth from "../config/firebase"
import { clearWatchlist } from "../features/watchlistSlice/watchlistSlice"
import { useAppDispatch } from "../hooks/hooks"

const Main = () => {
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch(logoutUser())  
      dispatch(clearWatchlist())
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div 
        className="w-full h-screen/5 bg-cover bg-center bg-no-repeat pt-16"
        style={{
            backgroundImage: "url(/hero-bg.png)"
        }}
    >
        ss
    </div>

    <div className="container mx-auto px-5">
        <button
          onClick={handleLogout}
          className="text-white"
        >salam</button>
    </div>
    </>
  )
}

export default Main