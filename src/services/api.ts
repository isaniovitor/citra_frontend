import axios from 'axios';

const { REACT_APP_GATEWAY } = process.env;

const api = axios.create({
  baseURL: REACT_APP_GATEWAY,
});

export default api;
