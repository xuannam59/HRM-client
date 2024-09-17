import axios from "./axiosClient";

const HandelAPI = (url, data, method = "get") => {
    return axios(url, {
        method: method,
        data,
    });
}
export default HandelAPI;