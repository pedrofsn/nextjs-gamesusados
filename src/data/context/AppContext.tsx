import { createContext } from "react"

type UserType = 'USER' | 'MANAGER' | 'ADMIN'

interface Session {
    usertype: UserType
    token: string
    type: string
}

const AppContext = createContext<Session>({
    usertype: 'USER',
    token: '',
    type: ''
})

export function AppProvider(props) {
    return (
        <AppContext.Provider value={{
            usertype: 'USER',
            token: '',
            type: ''
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext