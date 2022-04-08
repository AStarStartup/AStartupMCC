import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://astartupmcc.firebaseio.com/'
});

export default instance;
