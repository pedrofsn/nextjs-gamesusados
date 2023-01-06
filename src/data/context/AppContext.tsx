import { createContext } from "react"

type UserType = 'USER' | 'MANAGER' | 'ADMIN'

interface Session {
    usertype: UserType
    token: string
    type: string
    setSession?: () => void
}

const AppContext = createContext<Session>({
    usertype: 'USER',
    token: '',
    type: ''
})

export function AppProvider(props) {

    function setSession() {
        console.log("está alterando a sessão")
    }

    return (
        <AppContext.Provider value={{
            usertype: 'USER',
            token: '',
            type: '',
            setSession
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext