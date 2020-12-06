import axios from 'axios';

const api = axios.create({
  baseURL: 'https://vbeloti.xyz/projects/andre/',
});

export default api;

// baseURL: 'http://localhost/aula-php/aplicacoes/api/backend',
