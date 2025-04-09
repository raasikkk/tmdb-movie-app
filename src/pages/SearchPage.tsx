import { useLocation } from "react-router-dom"
import { useGetSearchedMoviesQuery } from "../features/movieSlice/movieSlice"
import MovieCard from "../components/MovieCard"
import Loader from "../components/Loader/Loader"
import { MovieType } from "../types/MovieType"
import { Search } from "lucide-react"
// import { useState } from "react"


const SearchPage = () => {
    const location = useLocation()
    const query = location?.search?.slice(3)
    // const [page, setPage] = useState(1)
    
    const { data, isLoading, error } = useGetSearchedMoviesQuery({query, page: 1})

    if (isLoading) return <Loader />
    if (error) return <div>error</div>
    if (!data) return null

  return (
    <>
        <div className="mt-16 container mx-auto px-5 flex flex-col w-full">
            <h1 className="mt-5 text-2xl font-semibold">Search Results:</h1>
            
                {data.results.length > 0 ? (
                    <div className="mt-5 grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {data.results.map((item: MovieType) => (
                            <MovieCard 
                                key={item.id}
                                data={item}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 justify-center items-center w-full h-[75vh]">
                        <h2 className="text-5xl font-bold">Oops !</h2>
                        <p className="flex items-center gap-2"><Search /> We found 0 results for your search</p>
                        <p className="font-semibold text-lg">"{query}"</p>
                    </div>
                )}
            
        </div>
    </>
  )
}

export default SearchPage