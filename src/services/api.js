import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Cambia esto si usas un dominio diferente
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
