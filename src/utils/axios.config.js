import axios from 'axios';

// Create a central Axios instance
const api = axios.create({
  // The base URL will be proxied by Vite to http://localhost:5000/api
  baseURL: '/api', 
  
  // CRITICAL: This tells Axios to send cookies (like your auth token)
  // with every request to the backend.
  withCredentials: true, 
});

export default api;