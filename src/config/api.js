import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_URL_SERVER || 'http://localhost:3004'
});

export default api;
