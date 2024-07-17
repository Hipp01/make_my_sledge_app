import axios from 'axios';

const url = 'http://127.0.0.1:5000';

const fetchOneDog = (id) => {
  return axios.get(`${url}/dogs/${id}`)
    .then(response => {
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
      return response.data;
    })
    .catch(error => {
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
      return response.data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
};

const loginRequest = async (username, password) => {
  try {
    const response = await axios.post(`${url}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error('Nom d\'utilisateur ou mot de passe incorrect');
  }
};

export { fetchOneDog, fetchAllDogs, fetchSled, loginRequest };