import { Link, useNavigate, useLocation } from "react-router-dom"
import { Search, House, Clapperboard, TvMinimal, Bookmark, User, LogOut, UserPlus, Github, Linkedin, Instagram, PlusCircle } from 'lucide-react';
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import auth from "@/config/firebase";
import { logoutUser } from "@/features/authSlice/authSlice";
import { clearWatchlist } from "@/features/watchlistSlice/watchlistSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const location = useLocation()
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
  const [query, setQuery] = useState(removeSpace)
  const navigate = useNavigate()

  useEffect(() => {
    if (query) {
      navigate(`/search?q=${query}`)
    }
  }, [query])

  useEffect(() => {
    setQuery(removeSpace)
  }, [navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const dispatch = useAppDispatch()
  const { isLoggedin, email } = useAppSelector((state) => state.auth)
  

  const handleLogout = async () => {
    try {
      toast.success("Signed out")
      await auth.signOut();
      dispatch(logoutUser())  
      dispatch(clearWatchlist())
      navigate("/")
    } catch (error) {
      toast.error("Failed to sign out")
      console.error(error)
    }
  }

  return (
    <>
      <div className="fixed top-0 w-full h-16 z-40 backdrop-brightness-50 text-white">
        <div className="container mx-auto px-5">
            {/* Desktop */}
            <div className="flex justify-between items-center py-1 lg:p-0">
              <div className="flex items-center gap-10">
                <Link to="/">
                  <img 
                    src="/logo.png" 
                    alt="logo" 
                    className="w-28 md:w-32 lg:w-36 my-3"
                  />
                </Link>
                <ul className="hidden md:flex items-center gap-5 lg:gap-10 text-base lg:text-lg">
                  <Link to="/tv">TV Shows</Link>
                  <Link to="/movies">Movies</Link>
                  <Link to="/saved">Bookmark</Link>
                </ul>
              </div>
              
              <div className="flex items-center gap-10">
                <form className="flex items-center" onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    id="search"
                    className="hidden sm:block outline-none ml-5 text-sm lg:text-base w-2/3"
                    placeholder="Search here..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  <label htmlFor="search" onClick={() => navigate("/search")}> 
                    <Search />
                  </label>
                </form>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <img 
                      src="/user.png" 
                      alt="profile"
                      className="rounded-full aspect-square size-8 sm:size-10 md:size-12" 
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-[#1E1E1E] text-[#FAFAFA] border-[#2A252C]">
                    <DropdownMenu><p className="p-1">My Account</p></DropdownMenu>
                    <DropdownMenuSeparator  />
                    {isLoggedin ? (
                      <>
                        <DropdownMenuGroup>
                      <DropdownMenuItem className="hover:bg-[#2A252C]">
                        <User />
                        <p className="text-ellipsis line-clamp-1">{email}</p>
                        {/* Profile */}
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate("/saved")} className="hover:bg-[#2A252C]">
                          <PlusCircle />
                          Saved
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="flex gap-1.5">
                        <UserPlus size={18} className="text-[#5b5b5b]" /> 
                        <span>Authors contacts</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="bg-[#1E1E1E] text-white border-[#2A252C]">
                          <DropdownMenuItem>
                            <Link to="https://github.com/raasikkk" className="flex items-center gap-1.5">
                              <Github /> GitHub
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link to="https://www.linkedin.com/in/rasul-zhankeldyuly/" className="flex items-center gap-1.5">
                              <Linkedin /> LinkedIn
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link to="https://www.instagram.com/raasikkk" className="flex items-center gap-1.5">
                              <Instagram /> Instagram
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut />
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem onClick={() => navigate("/auth/login")}>
                            <LogOut />
                            Login
                          <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/auth/register")}>
                          <LogOut />
                          Register
                        <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
        </div>
      </div>

      <div className="block md:hidden fixed bottom-0 w-full z-40 bg-black h-16 text-white">
        <div className="container mx-auto ">
          <div className="flex justify-around items-center py-3">
            <Link to="/" className="mobile-link text-sm gap-1">
              <House /> Home
            </Link>
            <Link to="/tv" className="mobile-link text-sm gap-1">
              <TvMinimal /> TV Shows
            </Link>
            <Link to="/movies" className="mobile-link text-sm gap-1">
              <Clapperboard /> Movies
            </Link>
            <Link to="/saved" className="mobile-link text-sm gap-1">
              <Bookmark /> Saved
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar