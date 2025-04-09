import { useGetMovieVideoQuery } from "../features/movieSlice/movieSlice";
import { MovieType } from "../types/MovieType"

interface VideoProps {
    data: MovieType;
    close: () => void
}

const VideoPlay = ({ data, close }: VideoProps) => {
    const { data: videoCode } = useGetMovieVideoQuery(data.id)
    console.log(videoCode)

  return (
    <div onClick={close} className="flex justify-center items-center fixed top-0 left-0 w-full h-screen z-40 backdrop-brightness-50">
        <div className="w-full flex flex-col justify-center items-center relative p-5">
            <iframe 
                src={`https://www.youtube.com/embed/${videoCode?.results[0].key}`} 
                className="rounded-md w-full md:w-1/2 lg:w-1/3 h-96"
            />  
        </div>
    </div>
  )
}

export default VideoPlay