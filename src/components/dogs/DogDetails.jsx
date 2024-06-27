import { useParams } from 'react-router-dom';
import { fetchOneDog } from "../../API/api";
import { useEffect, useState } from "react";
import { hexToBase64 } from "../../utils/utils";

export default function DogDetails() {
    const { id } = useParams();
    const [dog, setDog] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        fetchOneDog(id).then((data) => {
        setDog(data);
        setIsLoading(false);
        });
    }, [id]);
    
    return (
        <div className="container">
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            <div className="text-center">
                <h1>{dog.name}</h1>
                <img
                    src={`data:image/jpeg;base64,${hexToBase64(dog.photo)}`}
                    alt={`${dog.name}'s photo`}
                    className="img-fluid rounded"
                />
                <p className="card-text">
                    {dog.comment}
                </p>
            </div>


        )}
        </div>
    );
}
