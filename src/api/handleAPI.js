import axios from "./axiosClient";

const loginAPI = (email, password) => {
    const URL_BACKEND = 'api/v1/auth/login';
    const data = {
        email: email,
        password: password,
    }
    return axios.post(URL_BACKEND, data);
}

const registerAPI = (fullName, email, password, configPasword) => {
    const URL_BACKEND = "api/v1/auth/register";
    const data = { fullName, email, password, configPasword }
    return axios.post(URL_BACKEND, data);
}
export { loginAPI, registerAPI };