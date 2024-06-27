import PropTypes from "prop-types";

SearchField.propTypes = {
    query: PropTypes.string,
    setQuery: PropTypes.func,
};

export default function SearchField({ query, setQuery }) {
    return (
        <input 
            type="text"
            className="form-control me-3 w-75" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name ..."
        />
    );
}