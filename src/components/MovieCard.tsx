import { Link } from "react-router-dom";
import { MovieType } from "../types/MovieType"
import { Star, Bookmark } from 'lucide-react';
import moment from 'moment'
import { toggleBookmark } from "../features/watchlistSlice/watchlistSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface MovieCardProps {
    data: MovieType;
}

const MovieCard = ({ data }: MovieCardProps) => {
    const dispatch = useAppDispatch();
    const { items } = useAppSelector((state) => state.watchlist);
    const { uid } = useAppSelector((state) => state.auth)
    // const isBookmarked = items.includes(data.id);

    const [isLocalBookmarked, setIsLocalBookmarked] = useState(false)

    useEffect(() => {
        setIsLocalBookmarked(items.includes(data.id))
    }, [items, data.id])

    const handleBookmark = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!uid) return;

        setIsLocalBookmarked(prev => !prev)

        try {
            if (isLocalBookmarked) {
                toast.success("Removed from Bookmark")
            } else {
                toast.success("Added to Bookmark")
            }
            await dispatch(toggleBookmark(data.id)).unwrap()
        } catch (error) {
            setIsLocalBookmarked(prev => !prev)
            console.error("Bookmark update failed", error)
        }
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
                        {isLocalBookmarked 
                            ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 sm:size-6 fill-yellow-300"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                            : <Bookmark className="size-5 sm:size-6"/> 
                        }
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