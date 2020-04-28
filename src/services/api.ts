import axios from 'axios';
import Config from 'react-native-config';

console.log(Config.API_BASE_URL);

const api = axios.create({
  baseURL: Config.API_BASE_URL,
});

export default api;
