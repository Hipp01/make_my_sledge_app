import { useState } from 'react';
import { createDog } from '../../API/api';
import { base64ToHex } from '../../utils/utils';
import { useAuth } from "../../context/AuthContext";

export default function NewDog() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
      return (
        <div className="container text-center">
          <h1 className="text-center my-3">You need to log in first</h1>
          <button className="btn btn-primary w-25 my-3 " onClick={() => window.location.href = '/login'}>Login</button>
        </div>
        );
  }

  const [dogData, setDogData] = useState({
    name: '',
    date_of_birth: '',
    photo: '',
    place: '',
    endurance: 0,
    strength: 0,
    enemies: '',
    experience: 'false',
    temperament: '',
    heat_periods: '',
    sex: '0',
    stress_level: 0,
    ability_to_stay_in_place: 0,
    human_contact: '',
    comments: '',
    is_running: 'false',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDogData({
      ...dogData,
      [name]: value,
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

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        await createDog(dogData);
        alert('Dog created successfully');
        window.location.href = '/dogs';
    } catch (error) {
      console.error('Error creating dog', error);
      alert('Failed to create dog');
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mT-3 mb-5">Add a new dog</h1>
      <form onSubmit={submitHandler} className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" maxLength={80} value={dogData.name} onChange={handleChange} required/>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <label htmlFor="date_of_birth" className="form-label mb-md-3">Date of birth</label>
          <input type="date" className="form-control" id="date_of_birth" name="date_of_birth" value={dogData.date_of_birth} onChange={handleChange}/>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <label htmlFor="photo" className="form-label mb-md-3">Photo</label>
          <input type="file" className="form-control" id="photo" name="photo" accept="image/*" onChange={handlePhotoChange} />
        </div>
        <div className="col-6 col-md-6 mb-3">
          <label htmlFor="place" className="form-label">Place</label>
          <select className="form-select" id="place" name="place" value={dogData.place} onChange={handleChange}>
            <option value="front">Front</option>
            <option value="middle">Middle</option>
            <option value="back">Back</option>
            <option value="front;middle">Front + Middle</option>
            <option value="middle;back">Middle + Back</option>
          </select>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <label htmlFor="experience" className="form-label">Experience</label>
          <select className="form-select" id="experience" name="experience" value={dogData.experience} onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="is_running" className="form-label">Is running</label>
          <select className="form-select" id="is_running" name="is_running" value={dogData.is_running} onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <label htmlFor="endurance" className="form-label">Endurance</label>
          <input type="number" className="form-control" id="endurance" name="endurance" min={0} max={100} value={dogData.endurance} onChange={handleChange} />
        </div>
        <div className="col-6 col-md-3 mb-3">
          <label htmlFor="strength" className="form-label">Strength</label>
          <input type="number" className="form-control" id="strength" name="strength" min={0} max={100} value={dogData.strength} onChange={handleChange} />
        </div>
        <div className="col-6 col-md-3 mb-3">
          <label htmlFor="stress_level" className="form-label">Stress level</label>
          <input type="number" className="form-control" id="stress_level" name="stress_level" min={0} max={100} value={dogData.stress_level} onChange={handleChange} />
        </div>
        <div className="col-6 col-md-3 mb-3">
          <label htmlFor="ability_to_stay_in_place" className="form-label">Ability to stay in place</label>
          <input type="number" className="form-control" id="ability_to_stay_in_place" name="ability_to_stay_in_place" min={0} max={100} value={dogData.ability_to_stay_in_place} onChange={handleChange} />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="enemies" className="form-label">Enemies</label>
          <input type="text" className="form-control" id="enemies" name="enemies" maxLength={80} value={dogData.enemies} onChange={handleChange} />
        </div>
        
        <div className="col-md-6 mb-3">
          <label htmlFor="temperament" className="form-label">Temperament</label>
          <input type="text" className="form-control" id="temperament" name="temperament" maxLength={80} value={dogData.temperament} onChange={handleChange} />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="sex" className="form-label mb-md-4">Sex</label>
          <select className="form-select" id="sex" name="sex" value={dogData.sex} onChange={handleChange}>
            <option value="0">Female</option>
            <option value="1">Male</option>
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="heat_periods" className="form-label">Heat periods</label>
          <input type="text" className="form-control" id="heat_periods" name="heat_periods" maxLength={80} value={dogData.heat_periods} onChange={handleChange} disabled={dogData.sex === '1'} />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="human_contact" className="form-label">Human contact</label>
          <input type="text" className="form-control" id="human_contact" name="human_contact" maxLength={80} value={dogData.human_contact} onChange={handleChange} />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="comments" className="form-label">Comments</label>
          <input type="text" className="form-control" id="comments" name="comments" maxLength={80} value={dogData.comments} onChange={handleChange} />
        </div>
        <div className="col-12 mb-3">
          <button type="submit" className="btn btn-primary w-100">Submit</button>
        </div>
      </form>
    </div>
  );
}
