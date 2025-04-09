import Loader from "../components/Loader/Loader";
import MovieCard from "../components/MovieCard"
import { useGetPopularMoviesQuery } from "../features/movieSlice/movieSlice"
import { MovieType } from "../types/MovieType"

const Main = () => {
  const {data, isLoading, error} = useGetPopularMoviesQuery();

  if (isLoading) return <Loader />
  if (error) return <div>error</div>
  if (!data) return null

  return (
    <>
      <div 
        className="w-full h-screen/5 bg-cover bg-center bg-no-repeat pt-16"
        style={{
            backgroundImage: "url(/hero-bg.png)"
        }}
    >
        ss
    </div>

    <div className="container mx-auto px-5">
        <div className="grid justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {data.results.map((data: MovieType) => (
            <MovieCard 
              key={data.id}
              data={data}
            />
          ))}
        </div>
    </div>
    </>
  )
}

export default Main