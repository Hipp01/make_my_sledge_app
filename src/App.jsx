import { useState } from 'react';
import SearchBar from './components/searchBar/SearchBar';
import AllDogs from './components/dogs/AllDogs';

function App() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="App container">
      <h1 className="text-center my-3">Make My Sledge</h1>
      <div className="d-flex justify-content-center align-items-center w-100">
        <SearchBar 
          query={query} 
          setQuery={setQuery} 
          sort={sort} 
          setSort={setSort} 
          sortOrder={sortOrder} 
          toggleSortOrder={toggleSortOrder} 
        />
      </div>
      <AllDogs query={query} sort={sort} sortOrder={sortOrder} />
    </div>
  );
}

export default App;
