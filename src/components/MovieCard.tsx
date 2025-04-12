import { Link } from "react-router-dom";
import { MovieType } from "../types/MovieType"
import { Star, Bookmark } from 'lucide-react';
import moment from 'moment'
import { toggleBookmark } from "../features/watchlistSlice/watchlistSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

interface MovieCardProps {
    data: MovieType;
}

const MovieCard = ({ data }: MovieCardProps) => {
    const dispatch = useAppDispatch();
    const { items } = useAppSelector((state) => state.watchlist);
    const { uid } = useAppSelector((state) => state.auth)
    const isBookmarked = items.includes(data.id);

    const handleBookmark = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!uid) return;
        dispatch(toggleBookmark(data.id))
    }

    return ( //min-w-[230px] max-w-[230px]
        <Link to={`/details/${data.id}`} className="border-2 relative h-46 sm:h-80  flex items-end border-none rounded-xl hover:scale-105 transition">
            <img 
                src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} 
                alt={data.original_title} 
                className="absolute h-full top-0 w-full rounded-xl"
            />
            <div className="w-full p-3 backdrop-brightness-20 rounded-b-xl z-20">
                <div className="flex justify-between items-center gap-1">
                    <h3 className="text-white w-3/4 text-sm sm:text-lg font-semibold text-ellipsis line-clamp-1">{data.original_title || data.original_name}</h3>
                    <button 
                        onClick={handleBookmark}
                        className=""    
                    >
                        <Bookmark 
                            className={`size-5 sm:size-6 ${isBookmarked ? "fill-white" : ""}`} 
                        />
                    </button>
                </div>
                <div className="hidden sm:flex mt-2 justify-between">
                    <p className="text-sm">{moment(data.release_date).format("MMMM Do YYYY")}</p>
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