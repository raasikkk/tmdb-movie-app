import { Link } from "react-router-dom";
import { MovieType } from "../types/MovieType"
import { Star, Bookmark } from 'lucide-react';
import moment from 'moment'

interface MovieCardProps {
    data: MovieType;
}

const MovieCard = ({ data }: MovieCardProps) => {
    return ( //min-w-[230px] max-w-[230px]
        <Link to={`/details/${data.id}`} className="border-2 relative h-46 sm:h-80  flex items-end border-none rounded-xl hover:scale-105 transition">
            <img 
                src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} 
                alt={data.original_title} 
                className="absolute h-full top-0 w-full rounded-xl"
            />
            <div className="w-full p-3 backdrop-brightness-20 rounded-b-xl z-20">
                <div className="flex justify-between items-center gap-1">
                    <h3 className="text-white w-3/4 text-sm sm:text-lg font-semibold text-ellipsis line-clamp-1">{data.original_title}</h3>
                    <Bookmark className="size-5 sm:size-6" />
                </div>
                <div className="hidden sm:flex mt-2 justify-between">
                    <p className="text-gray-600 text-sm">{moment(data.release_date).format("MMMM Do YYYY")}</p>
                    <p className="text-white flex items-center gap-1">
                        <span className=""><Star size={20} /></span> 
                        {Number(data.vote_average).toFixed(1)}
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard