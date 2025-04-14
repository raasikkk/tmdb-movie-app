import Divider from "../components/Divider"
import Loader from "../components/Loader/Loader"
import { useGetMovieCastQuery, useGetMovieDetailsQuery, useGetSimilarMoviesQuery } from "../features/movieSlice/movieSlice"
import { useParams } from "react-router-dom"
import moment from "moment"
import { CastType, CrewType } from "../types/MovieType"
import VideoPlay from "../components/VideoPlay"
import { useState } from "react"
import ErrorPage from "./ErrorPage"
import SliderComponent from "@/components/SliderComponent"

const Details = () => {
    const { id } = useParams()
    const { data, isLoading, isFetching, error } = useGetMovieDetailsQuery(id)
    const { data: castData, isLoading: isCastLoading, isFetching: isCastFetching, error: castError } = useGetMovieCastQuery(id)
    const { data: SimilarMovies } = useGetSimilarMoviesQuery(id)

    const [isVideoOpen, setIsVideoOpen] = useState(false)

    function closeVideo() {
        setIsVideoOpen(false)
    }

    if (isLoading || isFetching || isCastLoading || isCastFetching) return <Loader />
    if (error || castError || !data || !castData) return <ErrorPage />


    const duration = (data?.runtime / 60)?.toFixed(1).split(".")
    const director = castData?.crew.filter((person: CrewType) => person?.job === "Director")
    const cast = castData?.cast.filter((person: CastType) => person?.profile_path !== null).slice(0, 20)

    // Similar Movies

  return (
    <>
        <div className='w-full h-[280px] relative block text-white'>
            <div className='w-full h-full'>
                <img
                    src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
                    className='h-full w-full object-cover'
                /> 
            </div> 
            <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>    
        </div>

        <div className="flex flex-col container mx-auto px-5 relative text-white">
            <div className="hidden lg:flex flex-col gap-3 absolute -top-32  w-60">
                <img 
                    src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`} 
                    className=" rounded-md"
                />
                <button 
                    onClick={() => setIsVideoOpen(true)} 
                    className="border-2 px-4 py-2 text-white text-lg font-medium rounded-md hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105"
                >
                    Play Now
                </button>
            </div>


            <div className="lg:ml-68">
                <h1 className="text-5xl font-bold">{data?.original_title}</h1>
                <p className="mt-2">{data?.tagline}</p>
                <Divider />
                <div className="flex items-center gap-3">
                    <span>Rating: {Number(data?.vote_average).toFixed(1)}+</span>

                    <span>|</span>

                    <span>View: {Number(data?.vote_count)}</span>

                    <span>|</span>

                    {duration && (
                        <span>Duration: {duration[0]}h {duration[1]}m</span>
                    )}
                </div>
                <Divider />
                <h2 className="text-3xl font-semibold">Overview</h2>
                <p className="mt-2">{data?.overview}</p>
                <Divider />
                <div className="flex items-center gap-3">
                    <span>Status: {data?.status}</span>

                    <span>|</span>

                    <span>Release Date: {moment(data?.release_date).format("MMMM Do YYYY")}</span>

                    <span>|</span>

                    <span>Revenue: {data?.revenue}</span>
                </div>
                <Divider />
                <p>Director: {director[0]?.original_name}</p>
                
                <button onClick={() => setIsVideoOpen(true)} className="block lg:hidden w-full my-4 border-2 text-xl font-medium p-2 rounded-md transition hover:scale-105 hover:bg-gradient-to-l from-red-700 to-orange-500">
                    Play Now
                </button>

                <Divider />
                <h2 className="text-3xl font-semibold">Cast:</h2>
                <div className="mt-5 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-10">
                    {cast.map((person: CastType) => (
                        <div 
                            key={person?.id}
                            className="flex flex-col items-center"
                        >
                            <img 
                                src={person?.profile_path ? `https://image.tmdb.org/t/p/w500/${person?.profile_path}` : "/anon-profile.svg"} 
                                alt={person?.original_name}
                                className="rounded-full aspect-square"
                            />
                            <p className="text-ellipsis text-center line-clamp-2 text-base font-medium">{person?.original_name}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>

        <h2 className="px-5 sm:px-10 lg:px-20 mt-5 py-5 text-2xl font-semibold text-white">Similar Movies</h2>
        {SimilarMovies && (
            <SliderComponent data={SimilarMovies.results}/>
        )}


        {
            isVideoOpen && <VideoPlay data={data} close={closeVideo}/>
        }
    </>
  )
}

export default Details