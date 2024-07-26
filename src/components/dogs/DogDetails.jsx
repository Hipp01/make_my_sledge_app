import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchOneDog, updateDog, deleteDog } from '../../API/api';
import { hexToBase64, base64ToHex, calculateAge } from '../../utils/utils';
import CircularProgressBar from './CircularProgressBar';
import male from '../../assets/images/male.png';
import female from '../../assets/images/female.png';
import { useAuth } from '../../context/AuthContext';
import { FaTrashCan } from "react-icons/fa6";


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
    sex: 0,
    comments: '',
    endurance: 0,
    strength: 0,
    stress_level: 0,
    ability_to_stay_in_place: 0,
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
      [name]: name == 'sex' ? parseInt(value, 10) : value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (!file || !file.type.startsWith('image/')) {
      alert('Veuillez sélectionner un fichier image.');
      return;
    }

    const MAX_SIZE_MB = 5;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      alert('Le fichier est trop volumineux. Veuillez sélectionner un fichier de moins de 5 Mo.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result.split(',')[1];
      setDogData({
        ...dogData,
        photo: base64ToHex(base64Image),
      });
    };
    reader.readAsDataURL(file);
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
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this dog?')) {
      try {
        await deleteDog(dog.id);
        alert('Dog deleted successfully');
        window.location.href = '/dogs';
      } catch (error) {
        console.error('Error deleting dog', error);
        alert('Failed to delete dog');
      }
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
                src={dog.sex == 0 ? female : male}
                alt={dog.sex == 0 ? 'Female' : 'Male'}
                className="position-absolute"
                style={{
                  width: '40px',
                  top: '10px',
                  right: '10px',
                  backgroundColor: 'white',
                  padding: '5px',
                  borderRadius: '5px',
                }}
              />
            </div>
            {isAuthenticated ? (
              <div className="w-25 mx-auto mt-3 bg-secondary text-white p-2 rounded">
                <form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="form-control"
                  />
                  <div className="mt-3 d-flex align-items-center justify-content-center">
                    <label className="mx-3">Sex : </label>
                    <div className="form-check me-3">
                      <input
                        type="radio"
                        id="male"
                        name="sex"
                        value={1}
                        checked={dogData.sex == 1}
                        onChange={handleChange}
                        className="form-check-input"
                      />
                      <label htmlFor="male" className="form-check-label">
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        type="radio"
                        id="female"
                        name="sex"
                        value={0}
                        checked={dogData.sex == 0}
                        onChange={handleChange}
                        className="form-check-input"
                      />
                      <label htmlFor="female" className="form-check-label">
                        Female
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Save</button>
                </form>
              </div>
            ) : (
              <p className="card-text mt-3"><strong>{dog.comments}</strong></p>
            )}
          </div>
          <div className="container mt-4">
            <h2>Details</h2>
            {isAuthenticated ? (
            <div>
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
                        <input
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
                    {dog.sex == 0 && (
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
                <div className="row justify-content-center my-3">
                  <div className="progress-bars d-flex flex-wrap justify-content-center">
                    <div className="progress-bar-item col-lg-2 col-sm-4 col-xs-4 mb-3 d-flex flex-column align-items-center">
                      <CircularProgressBar value={dogData.endurance} color="#049dff" label="Endurance" />
                      <input
                        type="number"
                        name="endurance"
                        value={dogData.endurance}
                        onChange={handleChange}
                        className="form-control mt-2"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="progress-bar-item col-lg-2 col-sm-4 col-xs-4 mb-3 d-flex flex-column align-items-center">
                      <CircularProgressBar value={dogData.strength} color="#fdba04" label="Strength" />
                      <input
                        type="number"
                        name="strength"
                        value={dogData.strength}
                        onChange={handleChange}
                        className="form-control mt-2"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="progress-bar-item col-lg-2 col-sm-4 col-xs-4 mb-3 d-flex flex-column align-items-center">
                      <CircularProgressBar value={dogData.stress_level} color="#ff5722" label="Stress level" />
                      <input
                        type="number"
                        name="stress_level"
                        value={dogData.stress_level}
                        onChange={handleChange}
                        className="form-control mt-2"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div className="progress-bar-item col-lg-2 col-sm-4 col-xs-4 mb-3 d-flex flex-column align-items-center">
                      <CircularProgressBar value={dogData.ability_to_stay_in_place} color="#4caf50" label="Stay" />
                      <input
                        type="number"
                        name="ability_to_stay_in_place"
                        value={dogData.ability_to_stay_in_place}
                        onChange={handleChange}
                        className="form-control mt-2"
                        min="0"
                        max="100"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
              <div className="container mt-4 row justify-content-center p-3">
                <div className="row bg-danger text-white p-2 rounded w-50 text-center">
                  <h2>Danger zone</h2>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    <FaTrashCan size="1.2em" /> Delete Dog <FaTrashCan size="1.2em" />
                  </button>
                </div>
              </div>
            </div>
            ) : (
            <div>
              <div className="row">
                <div className="col-md-6 col-sm-12 mb-3">
                  <div className="card p-3 shadow-sm">
                    <p><strong>Name : </strong>{dog.name}</p>
                    <p><strong>Age : </strong>{calculateAge(dogData.date_of_birth)} years ({dog.date_of_birth})</p>
                    <p><strong>Place : </strong>{dog.place.split(";").map(str => str.charAt(0).toUpperCase() + str.slice(1)).join(" & ")}</p>
                    {dog.enemies && <p><strong>Enemies : </strong>{dog.enemies}</p>}
                  </div>
                </div>
                <div className="col-md-6 col-sm-12 mb-3">
                  <div className="card p-3 shadow-sm">
                    <p><strong>Temperament : </strong> {dog.temperament[0].toUpperCase() + dog.temperament.slice(1)}</p>
                    {dog.sex == 0 && <p><strong>Heat periods :</strong> {dog.heat_periods}</p>}
                    <p><strong>Human contact :</strong> {dog.human_contact[0].toUpperCase() + dog.human_contact.slice(1)}</p>
                    <p><strong>Experienced :</strong> {dog.experience ? "Yes" : "No"}</p>
                    <p><strong>Is running :</strong> {dog.is_running ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center my-3">
                <div className="progress-bars d-flex flex-wrap justify-content-center">
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
            )}
          </div>
        </div>
      )}
    </div>
  );
}
