import axios from 'axios';

const fetchOneDog = (id) => {
  return axios.get(`http://localhost:5000/dogs/${id}`)
    .then(response => {
      console.log('API Response:', response); // Ajouter un journal pour la réponse complète
      return response.data; // Retourner uniquement les données
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
};

const fetchAllDogs = () => {
  return axios.get('http://localhost:5000/dogs')
    .then(response => {
      console.log('API Response:', response); // Ajouter un journal pour la réponse complète
      return response.data; // Retourner uniquement les données
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}

const fetchSled = () => {
}

export { fetchOneDog, fetchAllDogs, fetchSled };