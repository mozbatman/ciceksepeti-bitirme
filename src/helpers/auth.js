const AUTH_TOKEN = "authToken";

const removeAuthToken = () => {
    document.cookie = '';
}

const setAuthToken = authToken => {
    document.cookie = AUTH_TOKEN + '=' + authToken;
}


const auth = {
    setAuthToken,
    removeAuthToken
}

export default auth;