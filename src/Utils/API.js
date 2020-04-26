import axios from 'axios';

const baseURL = "http://192.168.1.6:5000/";

export default axios.create({
    baseURL: baseURL,
    timeout: 20000
});

export {baseURL};
