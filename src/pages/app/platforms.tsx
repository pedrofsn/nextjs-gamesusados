import { useEffect, useState } from "react"
import { Table, Container, Row, Col } from "@nextui-org/react";
import { api } from '../../services/api'
import Searchbox from "../../components/Toolbar";
import RegisterPlatform from "../../components/RegisterPlatform";
import { parseCookies } from "nookies"
import { UserType } from "../../data/context/UserSession.jsx"

export default function platforms() {
    const [content, setContent] = useState(null)
    const [userType, setUserType] = useState<UserType>(null)

    function onRegistered(text) {
        call()
    }

    async function call() {
        const json = await api.get('/platforms')
        setContent(json.data)
    }

    useEffect(() => {
        const { 'gamesusados.usertype': userType } = parseCookies()
        setUserType(userType as UserType || 'USER')
        call()
    }, [userType])

    function getTable() {
        return content?.map((element) => {
            return (
                <Table.Row key={element.id}>
                    <Table.Cell>{element.id}</Table.Cell>
                    <Table.Cell>{element.title}</Table.Cell>
                </Table.Row>
            )
        })
    }

    const uiNotManager = <Table>
        <Table.Header>
            <Table.Column>Id</Table.Column>
            <Table.Column>Plataforma</Table.Column>
        </Table.Header>
        <Table.Body>
            {getTable()}
        </Table.Body>
    </Table>

    const uiManager = <Container css={{ width: '100%' }}>
        <Row css={{ width: '100%' }}>
            <Col css={{ width: '25%' }}>
                <RegisterPlatform onRegistered={onRegistered} />
            </Col>
            <Col css={{ width: '75%' }}>
                {uiNotManager}
            </Col>
        </Row>
    </Container>

    return <>
        <Searchbox />
        {userType == 'MANAGER' ? uiManager : uiNotManager}
    </>
}