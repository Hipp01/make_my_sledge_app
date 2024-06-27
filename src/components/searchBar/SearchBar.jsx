import SearchField from './SearchField';
import SortField from './SortField';
import PropTypes from "prop-types";

SearchBar.propTypes = {
    query: PropTypes.string,
    setQuery: PropTypes.func,
    sort: PropTypes.string,
    setSort: PropTypes.func,
    sortOrder: PropTypes.string,
    toggleSortOrder: PropTypes.func,
};

export default function SearchBar({ query, setQuery, sort, setSort, sortOrder, toggleSortOrder }) {
    return (
        <div className="d-flex justify-content-center align-items-center m-3">
            <SearchField query={query} setQuery={setQuery} />
            <SortField 
                sort={sort} 
                sortOrder={sortOrder} 
                handleSortChange={(e) => setSort(e.target.value)} 
                toggleSortOrder={toggleSortOrder} 
            />
        </div>
    );
}
