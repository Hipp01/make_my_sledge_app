import { useParams } from 'react-router-dom';
import { fetchOneDog } from "../../API/api";
import { useEffect, useState } from "react";
import { hexToBase64, calculateAge } from "../../utils/utils";
import CircularProgressBar from './CircularProgressBar';
import male from "../../assets/images/male.png";
import female from "../../assets/images/female.png";

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
                <div>
                    <div className="text-center">
                        <h1>{dog.name}</h1>
                        <div className="position-relative d-inline-block">
                            <img
                                src={`data:image/jpeg;base64,${hexToBase64(dog.photo)}`}
                                alt={`${dog.name}'s photo`}
                                className="img-fluid rounded"
                                width={300}
                            />
                            <img 
                                src={dog.sex == 0 ? female : male} 
                                alt={dog.sex == 0 ? "Female" : "Male"}
                                className="position-absolute" 
                                style={{ 
                                    width: "40px", 
                                    top: "10px", 
                                    right: "10px", 
                                    backgroundColor: "white", 
                                    padding: "5px", 
                                    borderRadius: "5px" 
                                }} 
                            />
                        </div>
                        <p className="card-text">
                            {dog.comment}
                        </p>
                    </div>
                    <div>
                        <div>
                            <div className="container mt-4">
                                <h2>Details</h2>
                                <div className="row">
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <div className="card p-3 shadow-sm">
                                            <p><strong>Name : </strong>{dog.name}</p>
                                            <p><strong>Age : </strong> 
                                                {calculateAge(dog.date_of_birth)} years ({dog.date_of_birth}){dog.date_of_birth.split("T")[0].slice(5) === new Date().toISOString().slice(5, 10) ? (
                                                    <h5 className="badge bg-info mt-2 mx-2">Birthday 🎉🎉</h5>
                                                ) : null}
                                            </p>
                                            <p><strong>Place :</strong> {dog.place.split(";").map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(" & ")}</p>
                                            {dog.enemies && <p><strong>Enemies :</strong> {dog.enemies}</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <div className="card p-3 shadow-sm">
                                            <p><strong>Temperament :</strong> {dog.temperament[0].toUpperCase() + dog.temperament.slice(1)}</p>
                                            {dog.sex === 0 && <p><strong>Heat periods :</strong> {dog.heat_periods}</p>}
                                            <p><strong>Human contact :</strong> {dog.human_contact[0].toUpperCase() + dog.human_contact.slice(1)}</p>
                                            <p><strong>Experienced :</strong> {dog.experience === true ? "Yes" : "No"}</p>
                                            <p><strong>Is running :</strong> {dog.is_running === true ? "Yes" : "No"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center my-3">
                                <div className="progress-bars d-flex flex-wrap d-flex justify-content-center">
                                    <div className="progress-bar-item col-lg-2 col-sm-4 col-xs-4 mb-3 d-flex justify-content-center">
                                        <CircularProgressBar value={dog.endurance} color="#049dff" label="Endurance" />
                                    </div>
                                    <div className="progress-bar-item col-lg-2 col-sm-4 col-xs-4 mb-3 d-flex justify-content-center">
                                        <CircularProgressBar value={dog.strength} color="#fdba04" label="Strength" />
                                    </div>
                                    <div className="progress-bar-item col-lg-2 col-sm-4 col-xs-4 mb-3 d-flex justify-content-center">
                                        <CircularProgressBar value={dog.stress_level} color="#ff5722" label="Stress level" />
                                    </div>
                                    <div className="progress-bar-item col-lg-2 col-sm-4 col-xs-4 mb-3 d-flex justify-content-center">
                                        <CircularProgressBar value={dog.ability_to_stay_in_place} color="#4caf50" label="Stay" />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
