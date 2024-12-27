import axios from 'axios';


const api = () => {
  const userData = JSON.parse(localStorage.getItem('userdata'))
  console.log("userdata:::", userData);
  return axios.create({
    baseURL: 'http://localhost:5555', // Replace this with your API base URL
    headers: {
      'Content-Type': 'application/json',
      'Authorization': userData ? `Bearer ${userData.token}` : ''
    },
  });
} 

export default api;