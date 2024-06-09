import { useState } from 'react';
import SearchField from './SearchField';
import SortField from './SortField';

export default function SearchBar() {
    const [sort, setSort] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleSortChange = (event) => {
        setSort(event.target.value);
    };

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <div className="d-flex justify-content-center align-items-center m-3">
            <SearchField />
            <SortField 
                sort={sort} 
                sortOrder={sortOrder} 
                handleSortChange={handleSortChange} 
                toggleSortOrder={toggleSortOrder} 
            />
        </div>
    );
}
