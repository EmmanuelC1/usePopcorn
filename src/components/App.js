import { useEffect, useState } from 'react';
import NavBar from './navbar/NavBar.jsx';
import Logo from './navbar/Logo';
import Search from './navbar/Search.jsx';
import NumResults from './navbar/NumResults';
import Main from './Main.jsx';
import Box from './Box.jsx';
import MovieList from './main/movieResults/MovieList.jsx';
import Summary from './main/watchedMovies/Summary.jsx';
import WatchedMovieList from './main/watchedMovies/WatchedMovieList.jsx';
import Loader from './Loader.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import MovieDetails from './main/watchedMovies/MovieDetails.jsx';
import { useMovies } from '../hooks/useMovies.js';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query); // Custom Hook
  const [watched, setWatched] = useState(() =>
    JSON.parse(localStorage.getItem('watched'))
  );

  const handleSelectMovie = id => {
    setSelectedId(selectedId => (id === selectedId ? null : id));
  };

  function handleCloseSelectedMovie() {
    // function declaration needed for hoisting
    setSelectedId(null);
  }

  const handleAddWatched = movie => {
    setWatched(watched => [...watched, movie]);
  };

  const handleDeleteWatched = id => {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id));
  };

  useEffect(
    function () {
      localStorage.setItem('watched', JSON.stringify(watched));
    },
    [watched]
  );

  // Custom Hook

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseSelectedMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
