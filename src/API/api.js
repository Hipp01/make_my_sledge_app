import axios from 'axios';

const url = 'http://192.168.1.181:5000';

const fetchOneDog = (id) => {
  return axios.get(`${url}/${id}`)
    .then(response => {
      console.log('API Response:', response);
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
};

const fetchAllDogs = () => {
  return axios.get(`${url}/dogs`)
    .then(response => {
      console.log('API Response:', response);
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}

const fetchSled = () => {
}

export { fetchOneDog, fetchAllDogs, fetchSled };