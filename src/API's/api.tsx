import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.housivity.com/api/',
  timeout: 5000, // Increased timeout to 5000ms
  headers: {'X-Custom-Header': 'foobar'}
});


  export default api;
  