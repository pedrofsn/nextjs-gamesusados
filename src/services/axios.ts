import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
    const { 'gamesusados.token': token } = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:8080'
    })

    // api.interceptors.request.use(config => {
    //     console.log(config);
    //     return config;
    // })

    api.interceptors.response.use((response) => response, (error) => {
        if (error != null) {
            // Objeto de erro
            // error.response.data
            // {"timestamp":"2023-03-06T09:06:54.184+00:00","status":403,"error":"Forbidden","message":"Access Denied","path":"/report"}

            if (403 == error.response.status) {

            }
        }
        // whatever you want to do with the error
        throw error;
    })

    api.defaults.headers['Content-Type'] = `application/json`;
    api.defaults.headers['ClientSide'] = `AppGamesUsados`;

    if (token != null) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;
}