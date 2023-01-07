import { useState, createContext, useEffect } from "react"
import Cookies from 'js-cookie'

type UserType = 'USER' | 'MANAGER' | 'ADMIN'
const cookieName = 'gamesusados-session'

interface UserSession {
    usertype: UserType
    token: string
}

const emptySession: UserSession = {
    usertype: 'USER',
    token: ''
}

interface SystemSession {
    userSession: UserSession
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
        Cookies.set(cookieName, JSON.stringify(systemSession), { expires: 1, sameSite: 'strict' })
    }

    function loadSession() {
        const json = Cookies.get(cookieName)
        if (json != null && json != '') {
            const hasChanged = JSON.stringify(systemSession) != json
            const newSystemSession: SystemSession = JSON.parse(json)
            if (hasChanged) {
                updateSystemSession(newSystemSession)
            }
        }
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