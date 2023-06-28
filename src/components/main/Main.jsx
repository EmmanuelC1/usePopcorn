import ListBox from './movieResults/ListBox';
import WatchedBox from './watchedMovies/WatchedBox';

export default function Main() {
  return (
    <main className="main">
      <ListBox />
      <WatchedBox />
    </main>
  );
}
