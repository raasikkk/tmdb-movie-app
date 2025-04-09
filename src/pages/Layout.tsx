import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"

const Layout = () => {
  return (
    <>
        <Navbar />
        <div className="">
            <Outlet />
        </div>
    </>
  )
}

export default Layout