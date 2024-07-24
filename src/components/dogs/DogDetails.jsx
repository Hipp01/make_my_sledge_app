import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchOneDog, updateDog } from '../../API/api';
import { hexToBase64, calculateAge } from '../../utils/utils';
import CircularProgressBar from './CircularProgressBar';
import male from '../../assets/images/male.png';
import female from '../../assets/images/female.png';
import { useAuth } from '../../context/AuthContext';

export default function DogDetails() {
  const { id } = useParams();
  const [dog, setDog] = useState({});
  const [dogData, setDogData] = useState({
    photo: '',
    name: '',
    place: '',
    enemies: '',
    temperament: '',
    heat_periods: '',
    human_contact: '',
    experience: false,
    is_running: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchOneDog(id).then((data) => {
      setDog(data);
      setDogData({
        photo: data.photo,
        name: data.name,
        date_of_birth: data.date_of_birth,
        place: data.place,
        enemies: data.enemies || '',
        temperament: data.temperament || '',
        heat_periods: data.heat_periods || '',
        human_contact: data.human_contact || '',
        experience: data.experience || false,
        is_running: data.is_running || false,
        endurance: data.endurance,
        strength: data.strength,
        stress_level: data.stress_level,
        ability_to_stay_in_place: data.ability_to_stay_in_place,
        sex: data.sex,
        comments: data.comments,
      });
      setIsLoading(false);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDogData({
      ...dogData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDog(dog.id, dogData);
      alert('Data updated successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error updating data', error);
      alert('Failed to update data');
    }
  };

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
                src={dog.sex === 0 ? female : male} 
                alt={dog.sex === 0 ? "Female" : "Male"}
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
            { isAuthenticated ? (
                <div className="mt-3">
                    <input 
                        type="text"
                        name="comments"
                        value={dogData.comments}
                        onChange={handleChange}
                        className="form-control"
                        maxLength={200}
                    />
                </div> )
                : (
                    <p className="card-text mt-3"><strong>{dog.comments}</strong></p>
                )
            }
          </div>
          <div>
            <div className="container mt-4">
              <h2>Details</h2>
              {isAuthenticated ? (
                <form className="row" onSubmit={handleSubmit}>
                  <div className="col-md-6 col-sm-12 mb-3">
                    <div className="card p-3 shadow-sm">
                      <p>
                        <strong>Name : </strong>
                        <input 
                          type="text" 
                          name="name" 
                          value={dogData.name} 
                          onChange={handleChange} 
                          className="form-control" 
                          maxLength={80}
                        />
                      </p>
                      <p>
                        <strong>Age : </strong>
                        {calculateAge(dogData.date_of_birth)} years ({dog.date_of_birth})
                      </p>
                      <p>
                        <strong>Place : </strong>
                        <select 
                          name="place" 
                          value={dogData.place} 
                          onChange={handleChange} 
                          className="form-control"
                        >
                          <option value="back">Back</option>
                          <option value="middle">Middle</option>
                          <option value="front">Front</option>
                          <option value="middle;back">Back & Middle</option>
                          <option value="front;middle">Middle & Front</option>
                        </select>
                      </p>
                      {dog.enemies && (
                        <p>
                          <strong>Enemies : </strong>
                          <textarea 
                            name="enemies" 
                            value={dogData.enemies} 
                            onChange={handleChange} 
                            className="form-control" 
                            maxLength={80}
                          />
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 mb-3">
                    <div className="card p-3 shadow-sm">
                      <p>
                        <strong>Temperament : </strong>
                        <input
                          type="text"
                          name="temperament"
                          value={dogData.temperament}
                          onChange={handleChange}
                          className="form-control"
                          maxLength={80}
                        />
                      </p>
                      {dog.sex === 0 && (
                        <p>
                          <strong>Heat periods : </strong>
                          <input
                            type="text"
                            name="heat_periods"
                            value={dogData.heat_periods}
                            onChange={handleChange}
                            className="form-control"
                            maxLength={80}
                          />
                        </p>
                      )}
                      <p>
                        <strong>Human contact : </strong>
                        <input
                          type="text"
                          name="human_contact"
                          value={dogData.human_contact}
                          onChange={handleChange}
                          className="form-control"
                          maxLength={80}
                        />
                      </p>
                      <p>
                        <strong>Experienced : </strong>
                        <select
                          name="experience"
                          value={dogData.experience}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                      </p>
                      <p>
                        <strong>Is running : </strong>
                        <select
                          name="is_running"
                          value={dogData.is_running}
                          onChange={handleChange}
                          className="form-control"
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                      </p>
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </div>
                </form>
              ) : (
                <div className="row">
                  <div className="col-md-6 col-sm-12 mb-3">
                    <div className="card p-3 shadow-sm">
                      <p><strong>Name : </strong>{dog.name}</p>
                      <p><strong>Age : </strong>{dogData.age} years ({dog.date_of_birth})</p>
                      <p><strong>Place : </strong>{dog.place.split(";").map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(" & ")}</p>
                      {dog.enemies && <p><strong>Enemies : </strong>{dog.enemies}</p>}
                    </div>
                  </div>
                  <div className="col-md-6 col-sm-12 mb-3">
                    <div className="card p-3 shadow-sm">
                      <p><strong>Temperament : </strong> {dog.temperament[0].toUpperCase() + dog.temperament.slice(1)}</p>
                      {dog.sex === 0 && <p><strong>Heat periods :</strong> {dog.heat_periods}</p>}
                      <p><strong>Human contact :</strong> {dog.human_contact[0].toUpperCase() + dog.human_contact.slice(1)}</p>
                      <p><strong>Experienced :</strong> {dog.experience ? "Yes" : "No"}</p>
                      <p><strong>Is running :</strong> {dog.is_running ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </div>
              )}
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
      )}
    </div>
  );
}
