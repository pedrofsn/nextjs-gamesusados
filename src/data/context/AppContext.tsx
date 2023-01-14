import { useState, createContext, useEffect } from "react"
import Cookies from 'js-cookie'
import UserSession from './UserSession'
import SystemSession from './SystemSession'

const cookieName = 'gamesusados-session'

const emptySession: UserSession = {
    usertype: 'USER',
    token: ''
}

const emptySystemSession: SystemSession = {
    userSession: emptySession
}

const AppContext = createContext<SystemSession>(emptySystemSession)

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
        var in30Minutes = 1 / 48;
        const data = JSON.stringify(systemSession)
        Cookies.set(cookieName, data, { expires: in30Minutes, sameSite: 'Lax' })
    }

    function loadSession(): boolean {
        const json = Cookies.get(cookieName)
        if (json != null && json != '') {
            const hasChanged = JSON.stringify(systemSession) != json
            const newSystemSession: SystemSession = JSON.parse(json)
            if (hasChanged) {
                updateSystemSession(newSystemSession)
                return true
            }
        }
        return false
    }

    function logout() {
        Cookies.remove(cookieName)
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