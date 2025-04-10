import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import { MovieType } from '../../types/MovieType'
import { DataType } from '../../types/MovieType'

const API_KEY = import.meta.env.VITE_TMDB_KEY

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3/" }),
    endpoints: (builder) => ({
        getPopularMovies: builder.query<DataType, void>({
            query: () => `movie/popular?language=en-US&page=1&api_key=${API_KEY}`
        }),
        getTopRatedMovies: builder.query<DataType, void>({
            query: () => `movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`
        }),
        getUpcomingMovies: builder.query<DataType, void>({
            query: () => `movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`
        }),
        getMovieDetails: builder.query({
            query: (id) => `movie/${id}?language=en-US&api_key=${API_KEY}`
        }),
        getMovieCast: builder.query({
            query: (id) => `movie/${id}/credits?language=en-US&api_key=${API_KEY}`
        }),
        getMovieVideo: builder.query({
            query: (id) => `movie/${id}/videos?language=en-US&api_key=${API_KEY}`
        }),
        getSearchedMovies: builder.query<DataType, {query: string; page: number}>({
            query: (args) => `search/multi?query=${args.query}&include_adult=false&language=en-US&page=${args.page}&api_key=${API_KEY}`,
            serializeQueryArgs: ({ queryArgs }) => {
                return queryArgs.query
            },
            merge: (currentCache, newItems) => {
                const cacheItems = currentCache?.results.filter((item) => item.poster_path !== undefined && item.poster_path !== null)
                const filteredNewItems = newItems?.results.filter((item) => item.poster_path !== undefined && item.poster_path !== null)
                
                if (newItems.page === 1) return newItems
                const uniqueItems = [
                    ...(cacheItems || []),
                    ...(filteredNewItems || []).filter(
                      (newItem) =>
                        !cacheItems?.some((cacheItem) => cacheItem.id === newItem.id)
                    ),
                ];
              
                return {
                    ...newItems,
                    results: uniqueItems,
                };
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.page !== previousArg?.page
            }
        })
    })
})

export const { 
    useGetPopularMoviesQuery, 
    useGetTopRatedMoviesQuery, 
    useGetUpcomingMoviesQuery,
    useGetMovieDetailsQuery,
    useGetMovieCastQuery,
    useGetMovieVideoQuery,
    useGetSearchedMoviesQuery,
} = tmdbApi