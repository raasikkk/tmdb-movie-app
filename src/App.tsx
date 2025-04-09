import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Main from './pages/Main'
import Tv from './pages/Tv'
import Saved from './pages/Saved'
import Movies from './pages/Movies'
import Details from './pages/Details'
import SearchPage from './pages/SearchPage'
// import Counter from './components/Counter'
// import MovieCard from './components/MovieCard';
// import { useGetUpcomingMoviesQuery } from './features/movieSlice/movieSlice'
// import { MovieType } from "./types/MovieType"

function App() {
  // const { data, isLoading, error } = useGetUpcomingMoviesQuery();
  // if (error) return <div>An Error has occured!</div>

  // if (isLoading) return <div>Loading</div>
  // console.log(data.results)
  // console.log(data)

  return (
    // <div className='container mx-auto'>
    //   <h1 className='text-lg text-red-500'>Hello World</h1>
      
    //   <div className="grid grid-cols-5 gap-5">
    //     {data.results.map((data: MovieType) => (
    //       <MovieCard 
    //         key={data.id}
    //         data={data}
    //       />

    //     ))}
    //   </div>

    //   <Counter />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/tv" element={<Tv />}/>
            <Route path="/movies" element={<Movies />}/>
            <Route path="/saved" element={<Saved />}/>
            <Route path="/details/:id" element={<Details />}/>
            <Route path="/search" element={<SearchPage />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
