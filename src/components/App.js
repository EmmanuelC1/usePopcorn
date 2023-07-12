import { useEffect, useState } from 'react';
import { tempMovieData, tempWatchedData } from '../data/data.js';

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

const KEY = 'fe42d655';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`
        );

        if (!res.ok)
          throw new Error('Something went wrong while fetching movies');

        const data = await res.json();
        if (data.Response === 'False') throw new Error(data.Error);

        setMovies(data.Search);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
  }, []);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          <Summary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
