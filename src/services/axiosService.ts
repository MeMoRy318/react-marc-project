import axios from 'axios';
const { REACT_APP_TOKEN: tokenKey, REACT_APP_BASEURL: baseURL } = process.env;

const axiosService = axios.create({ baseURL });

axiosService.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${tokenKey}`;
    return config;
});

export { axiosService };
