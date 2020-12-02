import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost/aula-php/aplicacoes/api/backend',
});

export default api;
