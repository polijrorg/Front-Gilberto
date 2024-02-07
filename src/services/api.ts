import axios from 'axios';

const api = axios.create({ baseURL: 'https://gilberto.polijrinternal.com' });

export { api };
