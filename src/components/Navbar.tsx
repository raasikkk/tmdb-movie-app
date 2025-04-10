import { Link, useNavigate, useLocation } from "react-router-dom"
import { Search, House, Clapperboard, TvMinimal, Bookmark } from 'lucide-react';
import { useEffect, useState } from "react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <>
      <div className="fixed top-0 w-full h-16 z-40 backdrop-brightness-50">
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
                <img 
                  src="/user.png" 
                  alt="profile"
                  className="rounded-full aspect-square size-8 sm:size-10 md:size-12" 
                />
              </div>
            </div>
        </div>
      </div>

      <div className="block md:hidden fixed bottom-0 w-full z-40 bg-black h-16">
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