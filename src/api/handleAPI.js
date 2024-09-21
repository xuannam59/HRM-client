import axios from "./axiosClient";

const handelAPI = (url, data, method = "get") => {
    return axios(url, {
        method: method,
        data,
    });
}
export default handelAPI;