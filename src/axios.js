import Axios from 'axios';

const axiosInstance = Axios.create({
    baseURL: 'http://3.80.127.121:8000/',
    headers: {idToken: 'usr_'+ localStorage.getItem('userId') }
    //  baseURL: 'https://services.cacttus.com:5010/'
});

export default axiosInstance;