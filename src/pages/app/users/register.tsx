import { useEffect, useState } from "react"
import Searchbox from "../../../components/Toolbar"
import RegisterUser from "../../../components/RegisterUser"
import { UserType } from "../../../data/context/UserSession.jsx"
import { parseCookies } from "nookies"
import { Container, Row } from "@nextui-org/react"

export default function users() {
    const [userType, setUserType] = useState<UserType>(null)

    function onRegistered() {

    }

    useEffect(() => {
        const { 'gamesusados.usertype': userType } = parseCookies()
        setUserType(userType as UserType || 'USER')
    }, [userType])

    return <>
        <Searchbox />
        <Container>
            <Row justify="center" align="center" alignItems="center">
                <RegisterUser onRegistered={onRegistered} />
            </Row>
        </Container>
    </>
}