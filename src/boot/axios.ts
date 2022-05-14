import axios from 'axios';

const serverUrl = 'https://api.code-coaching.dev';
const api = axios.create({ baseURL: serverUrl });

export { api };
