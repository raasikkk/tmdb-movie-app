import { Link } from "react-router-dom";
import { MovieType } from "../types/MovieType"
import { Star, Bookmark } from 'lucide-react';
import moment from 'moment'

const MovieCard = ({ data }: MovieType) => {
    return ( //min-w-[230px] max-w-[230px]
        <Link to={`/details/${data.id}`} className="border-2 relative h-80  flex items-end border-none rounded-xl">
            <img 
                src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} 
                alt={data.original_title} 
                className="absolute h-full top-0 w-full rounded-xl"
            />
            <div className="w-full p-3 backdrop-brightness-20 rounded-b-xl z-20">
                <div className="flex justify-between items-center">
                    <h3 className="text-white text-lg font-semibold text-ellipsis line-clamp-1">{data.original_title}</h3>
                    <Bookmark className="" size={25} />
                </div>
                <div className="flex mt-2 justify-between">
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