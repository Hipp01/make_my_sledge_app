import { useState } from 'react';
import SearchBar from '../searchBar/SearchBar';
import AllDogs from './AllDogs';

export default function DogsPage() {
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
  
    const toggleSortOrder = () => {
      setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    return (
    <div className="App container">
      <h1 className="text-center">All Dogs</h1>
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