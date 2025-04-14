import Banner from "@/components/Banner"
import SliderComponent from "@/components/SliderComponent"
import { useGetPopularMoviesQuery, useGetTopRatedMoviesQuery, useGetUpcomingMoviesQuery } from "@/features/movieSlice/movieSlice"

const Main = () => {
  const { data: UpcomingMovies } = useGetUpcomingMoviesQuery()
  const { data: TopMovies } = useGetTopRatedMoviesQuery()
  const { data: PopularMovies } = useGetPopularMoviesQuery(1)
  return (
    <>
      <Banner />
      <h2 className="px-5 sm:px-10 lg:px-20 mt-5 py-5 text-2xl font-semibold text-white">Upcoming Movies</h2>
      {UpcomingMovies && (
        <SliderComponent data={UpcomingMovies.results}/>
      )}

      <h2 className="px-5 sm:px-10 lg:px-20 mt-5 py-5 text-2xl font-semibold text-white">Top Rated Movies</h2>
      {TopMovies && (
        <SliderComponent data={TopMovies.results}/>
      )}

      <h2 className="px-5 sm:px-10 lg:px-20 mt-5 py-5 text-2xl font-semibold text-white">Popular Movies</h2>
      {PopularMovies && (
        <SliderComponent data={PopularMovies.results}/>
      )}

    </>
  )
}

export default Main