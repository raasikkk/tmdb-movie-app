import { useGetMovieDetailsQuery } from '../features/movieSlice/movieSlice';
import MovieCard from '../components/MovieCard';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/hooks';
import toast from 'react-hot-toast';

const Watchlist = () => {
  const { items } = useAppSelector((state) => state.watchlist);
  const { isLoggedin } = useAppSelector((state) => state.auth)

  if (!isLoggedin) {
    toast.error("Please sign in to account")
    return <Navigate to="/auth/login" />
  }

  return (
    <div className="mt-16 min-h-[80vh] container mx-auto px-5 text-white">
      <h1 className="mt-5 pt-5 text-2xl font-semibold">Your Watchlist</h1>
      <div className="mt-5 grid justify-center grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-5">
        {items.map((movieId: number) => (
          <WatchlistItem key={movieId} movieId={movieId} />
        ))}
      </div>
    </div>
  );
};

const WatchlistItem = ({ movieId }: { movieId: number }) => {
  const { data, error, isLoading } = useGetMovieDetailsQuery(movieId);
  
  if (isLoading) return <p>salam</p>;
  if (error || !data) return null;
  
  return <MovieCard data={data} />;
};

export default Watchlist;