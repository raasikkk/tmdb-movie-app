import Loader from "../components/Loader/Loader"
import { useGetMovieDetailsQuery } from "../features/movieSlice/movieSlice"
import { useParams } from "react-router-dom"

const Details = () => {
    const { id } = useParams()
    const { data, isLoading, error } = useGetMovieDetailsQuery(id)

    if (isLoading) return <Loader />
    if (error) return <div>error</div>
  return (
    <>
        <div className='w-full h-[280px] relative hidden lg:block'>
            <div className='w-full h-full'>
                <img
                    src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
                    className='h-full w-full object-cover'
                /> 
            </div> 
            <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>    
        </div>

        <div className="container mx-auto px-5 relative">
            <img 
                src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} 
                className="absolute -top-32 w-60 rounded-md"
            />
            <div className="ml-68">
                <h1 className="text-5xl font-semibold">{data.original_title}</h1>
                <p className="text-black/40 mt-2 text-lg">{data.tagline}</p>
            </div>
        </div>
    </>
  )
}

export default Details