import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-e4157-default-rtdb.firebaseio.com/'
});

export default instance;