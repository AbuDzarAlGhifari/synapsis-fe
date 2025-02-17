import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://gorest.co.in/public/v2',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GOREST_API_TOKEN}`,
  },
});

export default axiosInstance;
