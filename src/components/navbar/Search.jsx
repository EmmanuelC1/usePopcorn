import { useRef } from 'react';
import { useKey } from '../../hooks/useKey';

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  // Custom hook to have searhc bar into focus when 'enter' key is press
  useKey('Enter', function () {
    // If the search bar is already active, return
    if (document.activeElement === inputEl.current) return;

    inputEl.current.focus();
    setQuery('');
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
