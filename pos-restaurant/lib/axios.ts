import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // แก้ให้ตรงกับ backend ของคุณ
});

export default apiClient;
