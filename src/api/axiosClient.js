import axios from "axios";


// Set config defaults when creating the instance
const baseURL = "http://localhost:3001/api/v1";
const getAccessToken = () => {
    const res = localStorage.getItem("authData");

    return res ? JSON.parse(res).token : ""
}


const instance = axios.create({
    baseURL: baseURL
});


instance.interceptors.request.use(function (config) {
    const token = getAccessToken();
    config.headers = {
        Authorization: `Bear ${token}`,
        Accept: "application/json",
        ...config.headers,
    }

    return config;
}, function (error) {

    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    if (response.data && response.data.data) return response.data;
    return response;
}, function (error) {
    if (error.response && error.response.data) return error.response.data
    return Promise.reject(error);
});

export default instance;