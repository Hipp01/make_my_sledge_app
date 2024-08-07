import PropTypes from "prop-types";

SortField.propTypes = {
    sort: PropTypes.string,
    sortOrder: PropTypes.string,
    handleSortChange: PropTypes.func,
    toggleSortOrder: PropTypes.func,
};

export default function SortField({ sort, sortOrder, handleSortChange, toggleSortOrder }) {
    return (
        <div className="d-flex align-items-center w-100">
            <label htmlFor="sort" className="w-50">Sort by : </label>
            <select className="form-control me-2 w-100" value={sort} onChange={handleSortChange}>
                <option value="">---</option>
                <option value="name">Name</option>
                <option value="endurance">Endurance</option>
                <option value="strength">Strength</option>
                <option value="stress_level">Stress level</option>
                <option value="ability_to_stay_in_place">Ability to stay</option>
            </select>
            <button className="btn btn-outline-primary me-2" onClick={toggleSortOrder}>
                {sortOrder === 'asc' ? '▲' : '▼'}
            </button>
        </div>
    );
}
