import axios from "./axiosClient";

const loginAPI = (email, password) => {
    const URL_BACKEND = 'auth/login';
    const data = {
        email: email,
        password: password,
    }
    return axios.post(URL_BACKEND, data);
}

const registerAPI = (fullName, email, password, configPassword) => {
    const URL_BACKEND = "auth/register";
    const data = { fullName, email, password, configPassword }
    return axios.post(URL_BACKEND, data);
}
export { loginAPI, registerAPI };