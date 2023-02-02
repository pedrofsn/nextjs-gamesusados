import useAppData from "../data/hook/useAppData"
import { Text, Navbar, Input } from "@nextui-org/react";
import SystemSession from '../data/context/SystemSession'

export default function Toolbar(props) {
    const { systemSession } = useAppData()
    const userType: SystemSession = systemSession.userSession.usertype
    const { onSearchTyped } = props
    const hasSearch = onSearchTyped != null

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

    return <Navbar isBordered>
        <Navbar.Brand>
            <Text h3>Olá, {userType}!</Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
            <Navbar.Link href="/app/games">Games</Navbar.Link>
            <Navbar.Link href="/app/announcement/all">Anúncios</Navbar.Link>
            <Navbar.Link href="/app/platforms">Plataformas</Navbar.Link>
            <Navbar.Link href="/app/reported">Denúncias</Navbar.Link>
            {shouldAddSearchBar()}
        </Navbar.Content>
    </Navbar>
}