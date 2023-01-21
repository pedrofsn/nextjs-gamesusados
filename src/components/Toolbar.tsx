import useAppData from "../data/hook/useAppData"
import { Text, Navbar, Input } from "@nextui-org/react";
import SystemSession from '../data/context/SystemSession'

export default function Toolbar(props) {
    const { systemSession } = useAppData()

    const userType: SystemSession = systemSession.userSession.usertype

    return <Navbar isBordered>
        <Navbar.Brand>
            <Text h3>Olá, {userType}!</Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
            <Navbar.Link href="/app/games">Games</Navbar.Link>
            <Navbar.Link href="/app/announcement/pending">Anúncios pendentes</Navbar.Link>
            <Navbar.Link href="/app/platforms">Plataformas</Navbar.Link>
            <Navbar.Content>
                <Input
                    clearable
                    placeholder="Buscar jogo"
                    onChange={(e) => props.onSearchTyped(e.target.value)}
                />
            </Navbar.Content>
        </Navbar.Content>
    </Navbar>
}