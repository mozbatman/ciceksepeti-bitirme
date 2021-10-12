import axios from "axios";
import auth from './helpers/auth';

const client = axios.create({
    baseURL: "http://bootcampapi.techcs.io/api/fe/v1",
    responseType: "application/json",
    headers: { "Access-Control-Allow-Origin": "*" },
});

client.interceptors.response.use(
    (response) => {
        if (response?.data?.access_token) {
            auth.setAuthToken(response.data.access_token);
            client.defaults.headers.common['Authorization'] = "Bearer " + response.data.access_token;
            console.log(client.defaults.headers);
        }
        return response;
    },
    async function (error) {
        console.log('Hataya girdi')
        const orginalRequest = error.config;
        if ((error.response.status === 401 || error.response.status === 403) && !orginalRequest._retry) {
            auth.removeAuthToken();
            window.location.href = "/auth";
            orginalRequest._retry = true;
            return client(orginalRequest);
        }
        return Promise.reject(error);
    }
);

export default client;
