import { useGetUpcomingMoviesQuery } from "@/features/movieSlice/movieSlice"
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader/Loader";
import ErrorPage from "@/pages/ErrorPage";

const Banner = () => {
    const { data, isLoading, error } = useGetUpcomingMoviesQuery();
    const [currentImage, setCurrentImage] = useState(0)

    const bannerData = data?.results

    const handleNext = () => {
        if ( bannerData && currentImage < bannerData.length - 1) {
            setCurrentImage(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (currentImage > 0) {
            setCurrentImage(prev => prev - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (bannerData && currentImage < bannerData.length - 1) {
                handleNext()
            } else {
                setCurrentImage(0)
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [bannerData, currentImage])

    if (isLoading) return <Loader />
    if (error) return <ErrorPage />

  return (
    <div className="w-full h-full">
        <div className="flex min-h-full max-h-[95vh] overflow-hidden">
            {bannerData && bannerData.map((data,index)=>{
                    return(
                            <div 
                                key={`${data.id}/bannerHome/${index}`} 
                                className='min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-transform duration-700 ease-in-out' 
                                style={{ transform : `translateX(-${currentImage * 100}%)`}}
                            >
                                <div className='w-full h-full'>
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
                                        className='h-full w-full object-cover'
                                    />
                                </div>

                                <div className='absolute top-0 w-full h-full hidden items-center  justify-between px-4 group-hover:lg:flex'>
                                    <button onClick={handlePrevious} className='bg-white  p-1 rounded-full  text-xl z-10 text-black'>
                                        <ArrowLeft />
                                    </button>
                                    <button onClick={handleNext} className='bg-white p-1 rounded-full  text-xl z-10 text-black '>
                                        <ArrowRight />
                                    </button>
                                </div>

                                <div className='absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent'>
                                </div>

                                <div className='container mx-auto text-white'>
                                    <div className='p-5 mb-5 lg:mb-10 w-full absolute bottom-0 max-w-md px-5 lg:px-10'>
                                        <h2 className='font-bold text-2xl lg:text-5xl drop-shadow-2xl '>{data?.title || data?.name}</h2>
                                        <p className='text-ellipsis line-clamp-3 my-2'>{data?.overview}</p>
                                        <div className='flex items-center gap-4'>
                                            <p>Rating : { Number(data.vote_average).toFixed(1) }+</p>
                                            <span>|</span>
                                            <p>View : { Number(data.popularity).toFixed(0) }</p>
                                        </div>
                                        <Link to={`/details/${data.id}`}>
                                            <button  className='border-2 px-8 py-2 text-white font-medium rounded mt-4 cursor-pointer hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105'>
                                                Play Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Banner