import axios from 'axios';

const API = axios.create({ baseURL: 'http://10.0.2.2:5080'});
export const fetchInterestPoints = () => API.get('/api/PoI');