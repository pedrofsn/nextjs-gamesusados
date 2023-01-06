import { useState, createContext } from "react"

type UserType = 'USER' | 'MANAGER' | 'ADMIN'

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
        setSystemSession(newSystemSession)
    }

    return (
        <AppContext.Provider value={{
            systemSession,
            updateUserSession
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext