import { useState, createContext, useEffect } from "react"
import Cookies from 'js-cookie'
import UserSession from './UserSession'
import SystemSession from './SystemSession'
import { setCookie, parseCookies } from 'nookies'
import { api } from '../../services/api'

const emptySession: UserSession = {
    usertype: 'USER',
    token: ''
}

const emptySystemSession: SystemSession = {
    userSession: emptySession
}

interface AppContextProps {
    systemSession?: SystemSession
    updateUserSession?: (UserSession) => void
    loadSession?: () => void
    logout?: () => void
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props) {
    const [systemSession, setSystemSession] = useState<SystemSession>(emptySystemSession)

    function updateUserSession(userSession: UserSession) {
        const newSystemSession: SystemSession = {
            userSession: userSession
        }
        updateSystemSession(newSystemSession)
    }

    function updateSystemSession(newSystemSession: SystemSession) {
        setSystemSession(newSystemSession)
        saveSession(newSystemSession)
    }

    function saveSession(systemSession: SystemSession) {
        const token = systemSession.userSession.token
        console.log('salvou o cookie ' + token)
        setCookie(undefined, 'gamesusados.token', token, {
            maxAge: 60 * 60 * 1, // 1 hour
        })
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }

    function loadSession(): boolean {
        // const json = Cookies.get(cookieName)
        // if (json != null && json != '') {
        //     const hasChanged = JSON.stringify(systemSession) != json
        //     const newSystemSession: SystemSession = JSON.parse(json)
        //     if (hasChanged) {
        //         updateSystemSession(newSystemSession)
        //         return true
        //     }
        // }
        return false
    }

    function logout() {
        Cookies.remove('gamesusados.token')
        setSystemSession(emptySystemSession)
    }

    useEffect(() => { loadSession() });

    return (
        <AppContext.Provider value={{
            systemSession,
            updateUserSession,
            loadSession,
            logout
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext