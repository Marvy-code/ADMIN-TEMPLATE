import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5034/api/', 
  headers: {
    'Content-Type': 'application/json',
    Authorization: typeof window !== 'undefined' ? `Bearer ${localStorage.getItem('token')}` : ''
  },
});

export default axiosInstance;