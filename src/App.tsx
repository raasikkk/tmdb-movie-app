import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Main from './pages/Main'
import Tv from './pages/Tv'
import Saved from './pages/Saved'
import Movies from './pages/Movies'
import Details from './pages/Details'
import SearchPage from './pages/SearchPage'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

function App() {

  return (
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
        
        <Route path="/auth/login" element={<Login />}/>
        <Route path="/auth/register" element={<Register />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
