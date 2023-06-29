import { useState } from 'react';
import { tempMovieData } from '../data/data.js';

import NavBar from './navbar/NavBar.jsx';
import Main from './main/Main.jsx';
import Search from './navbar/Search.jsx';
import Logo from './navbar/Logo';
import NumResults from './navbar/NumResults';
import ListBox from './main/movieResults/ListBox';
import MovieList from './main/movieResults/MovieList.jsx';
import WatchedBox from './main/watchedMovies/WatchedBox';

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <WatchedBox />
      </Main>
    </>
  );
}
