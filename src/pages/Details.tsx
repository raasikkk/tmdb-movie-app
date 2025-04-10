import Divider from "../components/Divider"
import Loader from "../components/Loader/Loader"
import { useGetMovieCastQuery, useGetMovieDetailsQuery } from "../features/movieSlice/movieSlice"
import { useParams } from "react-router-dom"
import moment from "moment"
import { CastType, CrewType } from "../types/MovieType"
import VideoPlay from "../components/VideoPlay"
import { useState } from "react"
import ErrorPage from "./ErrorPage"

const Details = () => {
    const { id } = useParams()
    const { data, isLoading, isFetching, error } = useGetMovieDetailsQuery(id)
    const { data: castData, isLoading: isCastLoading, isFetching: isCastFetching, error: castError } = useGetMovieCastQuery(id)
    const [isVideoOpen, setIsVideoOpen] = useState(false)

    function closeVideo() {
        setIsVideoOpen(false)
    }

    if (isLoading || isFetching || isCastLoading || isCastFetching) return <Loader />
    if (error || castError || !data || !castData) return <ErrorPage />


    const duration = (data.runtime / 60)?.toFixed(1).split(".")
    const director = castData.crew.filter((person: CrewType) => person.job === "Director")
    const cast = castData.cast.filter((person: CastType) => person.profile_path !== null).slice(0, 20)

  return (
    <>
        <div className='w-full h-[280px] relative block'>
            <div className='w-full h-full'>
                <img
                    src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
                    className='h-full w-full object-cover'
                /> 
            </div> 
            <div className='absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent'></div>    
        </div>

        <div className="flex flex-col container mx-auto px-5 relative">
            <div className="hidden lg:flex flex-col gap-3 absolute -top-32  w-60">
                <img 
                    src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`} 
                    className=" rounded-md"
                />
                <button onClick={() => setIsVideoOpen(true)} className="w-full border-2 text-xl font-medium p-2 rounded-md transition hover:-translate-y-1">
                    Play Now
                </button>
            </div>


            <div className="lg:ml-68">
                <h1 className="text-5xl font-semibold">{data?.original_title}</h1>
                <p className="text-black/40 mt-2">{data?.tagline}</p>
                <Divider />
                <div className="flex items-center gap-3">
                    <span>Rating: {Number(data?.vote_average).toFixed(1)}+</span>

                    <span>|</span>

                    <span>View: {Number(data?.vote_count)}</span>

                    <span>|</span>

                    <span>Duration: {duration[0]}h {duration[1]}m</span>
                </div>
                <Divider />
                <h2 className="text-2xl font-semibold">Overview</h2>
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
                
                <button onClick={() => setIsVideoOpen(true)} className="block lg:hidden w-full my-4 border-2 text-xl font-medium p-2 rounded-md transition hover:opacity-50">
                    Play Now
                </button>

                <Divider />
                <h2 className="text-2xl font-semibold">Cast:</h2>
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
                            <p className="text-ellipsis text-center line-clamp-2 text-sm">{person?.original_name}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>

        {
            isVideoOpen && <VideoPlay data={data} close={closeVideo}/>
        }
    </>
  )
}

export default Details