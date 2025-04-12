import { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader/Loader";
import MovieCard from "../components/MovieCard";
import { useGetPopularTvShowsQuery } from "../features/movieSlice/movieSlice"
import ErrorPage from "./ErrorPage";

const Movies = () => {
  const [page, setPage] = useState(1)
  const loaderRef = useRef<HTMLDivElement>(null)

  const { data, isLoading, isFetching, error } = useGetPopularTvShowsQuery(page);

  useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && !isFetching && data?.total_pages && page < data.total_pages) {
              setPage(prev => prev + 1)
          }
      })

      if (loaderRef.current) observer.observe(loaderRef.current)

      return () => observer.disconnect()
  }, [isFetching, data?.total_pages, page])

  if (isLoading) return <Loader />
  if (error) return <ErrorPage />

  return (
    <div className="mt-16 min-h-[80vh] container mx-auto px-5 text-white">
      <h1 className="mt-5 pt-5 text-2xl font-semibold">Popular TV Shows</h1>

      <div className="">
        {data && data?.results.length > 0 && (
          <>
              <div className="mt-5 grid justify-center grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-5">
                {data?.results.map((item) => (
                  <MovieCard 
                    key={item.id}
                    data={item}
                    />
                ))}
              </div>
              <div ref={loaderRef} className="mt-5">
                  {!isFetching && data?.total_pages && page >= data?.total_pages && (
                      <p className="text-center text-xl">No more results</p>
                  )}
              </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Movies