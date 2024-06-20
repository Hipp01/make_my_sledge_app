import axios from 'axios';

const url = 'http://192.168.1.181:5000';

const fetchOneDog = (id) => {
  return axios.get(`${url}/dogs/${id}`)
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

const fetchSled = (numSleds, sledParams) => {
  let queryString = `num_sleds=${numSleds}`;
  for (let i = 1; i <= numSleds; i++) {
    const { name, weight, comfort_level, speed_desire } = sledParams[i - 1];
    queryString += `&name${i}=${name}&weight${i}=${weight}&comfort_level${i}=${comfort_level}&speed_desire${i}=${speed_desire}`;
  }

  return axios.get(`${url}/sleds?${queryString}`)
    .then(response => {
      console.log('API Response:', response);
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
};

export { fetchOneDog, fetchAllDogs, fetchSled };