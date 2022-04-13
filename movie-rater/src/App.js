import React, {useState, useEffect} from 'react';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form'
import './App.css';
import {useCookies} from 'react-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import useFetch from './hooks/useFetch';

function App() {
  const [movies,setMovie] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token, setToken, deleteToken] = useCookies(['mr-token'])
  const [data,loading,error] = useFetch()

  useEffect(() => {
    console.log(data)
   setMovie(data)
  }, [data])

  useEffect( () => {
    console.log(token)
    if(!token['mr-token']) window.location.href ='/'
}, [token])

  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null)
  }

  const editClicked = movie => {
    setEditedMovie(movie)
    setSelectedMovie(null)
  }

  const updatedMovie = movie => {
    const newMovies = movies.map( mov => {
      if (mov.id === movie.id){
        return movie;
      }
      return mov;
    })
    setMovie(newMovies)
  }

  const newMovie = () => {
    setEditedMovie({title: '', description: ''})
    setSelectedMovie(null)
  }

  const movieCreated = movie => {
    const newMovies = [...movies, movie];
    setMovie(newMovies)
  }

  const removeCliked = movie => {
    const newMovies = movies.filter(mov => mov.id !== movie.id)
    setMovie(newMovies)
  }

  const logOutUser = () => {
    deleteToken(['mr-token']);
  }

  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>Error loading movies</h1>
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>
            <FontAwesomeIcon icon={faFilm}/>
            <span> Movie rater</span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logOutUser}/>
      </header>
      <div className='layout'>
        
        <div>
          <MovieList movies = {movies} movieClicked={loadMovie} editClicked={editClicked} removeClicked={removeCliked}/>
          <button onClick={newMovie}>New movie</button>
        </div>

        <MovieDetails movie ={selectedMovie} updateMovie = {loadMovie} />
        {editedMovie ? <MovieForm movie ={editedMovie} updatedMovie = {updatedMovie} movieCreated={movieCreated}/> : null}
      </div>
    </div>
  );
}

export default App;
