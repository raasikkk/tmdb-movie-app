import { useLocation, useNavigate } from "react-router-dom"
import { useGetSearchedMoviesQuery } from "../features/movieSlice/movieSlice"
import MovieCard from "../components/MovieCard"
// import Loader from "../components/Loader/Loader"
import { Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import ErrorPage from "./ErrorPage"


const SearchPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const query = location?.search?.slice(3)
    const [page, setPage] = useState(1)
    const loaderRef = useRef<HTMLDivElement>(null)
    
    const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
    const [mobileQuery, setMobileQuery] = useState(removeSpace)

    useEffect(() => {
        if (mobileQuery) {
          navigate(`/search?q=${mobileQuery}`)
        }
      }, [mobileQuery])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
      }

    const { data, isLoading, isFetching, error } = useGetSearchedMoviesQuery(
        {query, page}, 
        {skip: !query}
    )

    useEffect(() => {
        setPage(1)
    }, [query])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isFetching && data?.total_pages && page < data.total_pages) {
                setPage(prev => prev + 1)
            }
        })

        if (loaderRef.current) observer.observe(loaderRef.current)

        return () => observer.disconnect()
    }, [isFetching, data?.total_pages, page])

    // if (isLoading) return <Loader />
    if (error) return <ErrorPage />

  return (
    <>
        <div className="mt-16 min-h-[80vh] container mx-auto px-5 flex flex-col w-full">
            <h1 className="mt-5 text-2xl font-semibold">Search Results:</h1>

                <form className="mt-5 flex items-center justify-between gap-3 sm:hidden" onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    id="search"
                    className="block p-1 border-2 rounded-md outline-none w-full placeholder:text-gray-500"
                    placeholder="Search here..."
                    value={mobileQuery}
                    onChange={(e) => setMobileQuery(e.target.value)}
                  />
                </form>

                {isLoading && (
                    <div className="mt-5 text-center">Loading...</div>
                )}
            
                {data && data?.results?.length > 0 ? (
                    <>
                        <div className="mt-5 grid justify-center grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-5">
                            {data.results.map((item) => (
                                <MovieCard key={item.id} data={item} />
                            ))}
                        </div>
                        <div ref={loaderRef} className="mt-5">
                            {!isFetching && data?.total_pages && page >= data?.total_pages && (
                                <p className="text-center text-xl">No more results</p>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col gap-4 justify-center items-center w-full h-[75vh]">
                        <h2 className="text-5xl font-bold">Oops !</h2>
                        <p className="flex items-center gap-2"><Search /> We found 0 results for your search</p>
                    </div>
                )}
            
        </div>
    </>
  )
}

export default SearchPage