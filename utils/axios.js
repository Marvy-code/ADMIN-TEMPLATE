import axios from 'axios';

const token = localStorage.getItem('token'); 

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5034/api/', 
  headers: {
    'Content-Type': 'application/json',
    Authorization: typeof window !== 'undefined' ? `Bearer ${token}` : ''
  },
});

export default axiosInstance;