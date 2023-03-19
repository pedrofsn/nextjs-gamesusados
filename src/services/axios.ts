import axios from "axios"
import { parseCookies } from "nookies"

export function getAPIClient(ctx?: any) {
    const { 'gamesusados.token': token } = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:8080'
    })

    api.defaults.headers['Content-Type'] = `application/json`
    api.defaults.headers['ClientSide'] = `AppGamesUsados`

    if (token != null) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    return api
}