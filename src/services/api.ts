import axios from 'axios';

const api = axios.create({
  baseURL: 'http://www.fernandoleonid.com.br/fatec/andre/api',
});

export default api;

// baseURL: 'http://localhost/aula-php/aplicacoes/api/backend',
