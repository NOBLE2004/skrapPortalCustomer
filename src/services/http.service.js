import axios from "axios";
import { API_URL } from "../environment/index";

if (localStorage.getItem("token")) {
    axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
}
if (localStorage.getItem("domain")) {
    axios.defaults.headers.common["domain"] = localStorage.getItem("domain");
}
export default class HttpService {
    static setToken = (token, domain) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        axios.defaults.headers.common["domain"] = domain;
    };

    get = (url, params) => axios.get(`${API_URL}/${url}`, {params});

    post = (url, data, params) => axios.post(`${API_URL}/${url}`, data, {params});

    put = (url, data, params) => axios.put(`${API_URL}/${url}`, data, {params});

    delete = (url, params) => axios.delete(`${API_URL}/${url}`, {params});

    gets = (url, params) => axios.get(`${API_URL}/${url}`, {params});

}
