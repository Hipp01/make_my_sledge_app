import { fetchAllDogs } from "../../API/api";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CardDog from "./CardDog";
import { useAuth } from '../../context/AuthContext';

AllDogs.propTypes = {
    query: PropTypes.string,
    sort: PropTypes.string,
    sortOrder: PropTypes.string,
};

export default function AllDogs({ query, sort, sortOrder }) {
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();


  useEffect(() => {
    fetchAllDogs().then((data) => {
      setDogs(data);
      setIsLoading(false);
    });
  }, []);

  const filteredDogs = dogs
    .filter(dog => dog.name.toLowerCase().substring(0, query.toLowerCase().length) === query.toLowerCase())
    .sort((a, b) => {
      if (!sort) return 0;
      if (sortOrder === 'asc') {
        return a[sort] > b[sort] ? 1 : -1;
      } else {
        return a[sort] < b[sort] ? 1 : -1;
      }
    });

  return (
    <div className="container">
      <div className="d-flex justify-content-between">
        <button className="btn btn-primary my-2" 
          onClick={() => {
            setIsLoading(true);
            fetchAllDogs().then((data) => {
              setDogs(data);
              setIsLoading(false);
            });
          }}>
          Refresh
        </button>
        { isAuthenticated ? (
            <a href="/dogs/new" className="btn btn-primary my-2 ml-2">Add new dog</a>
        ) : null }
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {filteredDogs.map(dog => (
            <div key={dog.id} className="col-12 col-md-6 col-lg-3 my-2 px-2">
              <CardDog dog={dog} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
