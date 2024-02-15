import axios from 'axios';

// axios.defaults.baseURL='http://localhost:8080/api'
axios.defaults.baseURL='https://neroanimals.fly.dev/api'

createInterceptors()

function createInterceptors() {
    const requestInterceptor = axios.interceptors.request.use(
        request => {
            let user = JSON.parse(localStorage.getItem('user'))
            if (user !== null)
                request.headers.Authorization = 'Bearer ' + user.accessToken;
            return request;
        },
        error => error
    )

    const responseInterceptor = axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response.status !== 401)
                return Promise.reject(error);
            let user = JSON.parse(localStorage.getItem('user'))
            if (user === null)
                return window.location.href = '/login'
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
            return axios
                .post("/user/refresh", {
                    refreshToken: user.refreshToken,
                })
                .then(response => {
                    localStorage.setItem('user', JSON.stringify(response.data))
                    error.response.config.headers["Authorization"] = 'Bearer ' + response.data.accessToken
                    return axios(error.response.config)
                })
                .catch(e => {
                    if (e.response.status !== 401)
                        return Promise.reject(e);
                    localStorage.removeItem('user')
                    return window.location.href = '/login'
                })
                .finally(createInterceptors);
        })
}
export default axios
