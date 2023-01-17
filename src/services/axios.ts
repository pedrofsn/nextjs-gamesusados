import axios from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
    const { 'gamesusados.token': token } = parseCookies(ctx)
    console.log('tá vindo aqui do axios.ts');

    const api = axios.create({
        baseURL: 'http://localhost:8080'
    })

    api.interceptors.request.use(config => {
        console.log(config);
        return config;
    })

    api.defaults.headers['Content-Type'] = `application/json`;
    api.defaults.headers['ClientSide'] = `AppGamesUsados`;

    console.log(`token ===> ${token}`)
    if (token != null) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    return api;
}