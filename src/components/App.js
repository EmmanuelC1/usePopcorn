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

const KEY = 'fe42d655';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  useEffect(function () {
    async function fetchMovies() {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`
      );
      const data = await res.json();
      setMovies(data.Search);
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
          <MovieList movies={movies} />
        </Box>

        <Box>
          <Summary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
