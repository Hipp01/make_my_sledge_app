import { fetchAllDogs } from "../../API/api";
import { useEffect, useState } from "react";
import CardDog from "./CardDog";

export default function AllDogs() {
    const [dogs, setDogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        fetchAllDogs().then((data) => {
        setDogs(data);
        setIsLoading(false);
        });
    }, []);
    
    return (
        <div className="container">
            <button className="btn btn-primary my-2" 
                onClick={() => {
                    setIsLoading(true);
                    fetchAllDogs().then((data) => {
                    setDogs(data);
                    setIsLoading(false);
                });
            }}>Refresh</button>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
            <div className="row">
                    {dogs.map(dog => (
                        <div key={dog.id} className="col-12 col-md-6 col-lg-3 my-2 px-2">
                            <CardDog dog={dog} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}