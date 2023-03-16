import { Text, Navbar, Input, Button, Link } from "@nextui-org/react"
import { parseCookies } from "nookies"
import { useEffect, useState } from "react"
import { UserType } from "../data/context/UserSession"
import useAppData from "../data/hook/useAppData"

export default function Toolbar(props, ctx?: any) {
    const [userType, setUserType] = useState<UserType>(null)
    const [token, setToken] = useState(null)
    const { onSearchTyped } = props
    const hasSearch = onSearchTyped != null
    const { logout } = useAppData()

    function shouldAddSearchBar() {
        if (hasSearch) {
            return <Navbar.Content>
                <Input
                    clearable
                    placeholder="Buscar jogo"
                    onChange={(e) => onSearchTyped(e.target.value)}
                />
            </Navbar.Content>
        }

        return <></>
    }

    useEffect(() => {
        const { 'gamesusados.token': token, 'gamesusados.usertype': userType } = parseCookies()
        setToken(token)
        setUserType(userType as UserType || 'USER')
    }, [token, userType])

    return <Navbar isBordered>
        <Navbar.Brand>
            <Text h3>Olá, {userType}!</Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
            <Navbar.Link href="/app/games">Games</Navbar.Link>
            {userType == 'MANAGER' ? <Navbar.Link href="/app/announcement/all">Anúncios</Navbar.Link> : <></>}
            <Navbar.Link href="/app/platforms">Plataformas</Navbar.Link>
            {userType == 'MANAGER' ? <Navbar.Link href="/app/reported">Denúncias</Navbar.Link> : <></>}
            {userType == 'ADMIN' || userType == 'MANAGER' ? <Navbar.Link href="/app/users">Usuários</Navbar.Link> : <></>}
            {shouldAddSearchBar()}
            {token != null ?
                <Navbar.Item>
                    <Button auto flat as={Link} onPress={logout}>
                        Logout
                    </Button>
                </Navbar.Item>
                :
                <Navbar.Item>
                    <Button auto flat as={Link} href="/app/login">
                        Login
                    </Button>
                </Navbar.Item>
            }
        </Navbar.Content>
    </Navbar>
}