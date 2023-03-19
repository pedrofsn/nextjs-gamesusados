import { createContext, useEffect } from "react"
import { setCookie, destroyCookie, parseCookies } from 'nookies'
import { api } from '../../services/api'
import UserSession from "./UserSession"
import { useRouter } from 'next/router'

interface AppContextProps {
    saveSession?: (UserSession) => void
    loadSession?: () => boolean
    logout?: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props, ctx?: any) {
    const router = useRouter()
    const route = '/app/games'

    function saveSession(userSession: UserSession) {
        const { usertype, token } = userSession
        const maxAge = 60 * 60 * 1 // 1 hour
        setCookie(undefined, 'gamesusados.usertype', usertype, { maxAge: maxAge })
        setCookie(undefined, 'gamesusados.token', token, { maxAge: maxAge, })
        api.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    function loadSession(): boolean {
        const { 'gamesusados.token': token, 'gamesusados.usertype': userType } = parseCookies(ctx)
        if (token != null && userType != null) {
            return true
        }
        return false
    }

    function logout() {
        destroyCookie(undefined, 'gamesusados.token')
        destroyCookie(undefined, 'gamesusados.usertype')

        if (router.pathname == route) {
            router.reload()
        } else {
            router.replace(route)
        }

    }

    useEffect(() => { loadSession() })

    return (
        <AppContext.Provider value={{
            saveSession,
            loadSession,
            logout
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext