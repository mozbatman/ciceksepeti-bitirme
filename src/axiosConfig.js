import axios from "axios";
import auth from './helpers/auth';

const client = axios.create({
    baseURL: "https://bootcampapi.techcs.io/api/fe/v1",
    responseType: "application/json",
    headers: { "Access-Control-Allow-Origin": "*" },
});

client.interceptors.response.use(
    (response) => {
        if (response?.data?.access_token) {
            console.log(response.config.reduxSourceAction.payload.request.data);
            auth.setAuthToken(response.data.access_token);
            client.defaults.headers.common['Authorization'] = "Bearer " + response.data.access_token;
            document.cookie = 'email=' + response.config.reduxSourceAction.payload.request.data.email;
        }
        return response;
    },
    async function (error) {
        const orginalRequest = error.config;
        if (error.config.reduxSourceAction.type !== 'SIGN_IN' && (error.response.status === 401 || error.response.status === 403) && !orginalRequest._retry) {
            auth.removeAuthToken();
            window.location.href = "/auth";
            orginalRequest._retry = true;
            return client(orginalRequest);
        }
        return Promise.reject(error);
    }
);

export default client;
