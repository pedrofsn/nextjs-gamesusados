import { useEffect, useState } from "react"
import Searchbox from "../../../components/Toolbar"
import { Col, Row, Container, Table } from "@nextui-org/react"
import RegisterUser from "../../../components/RegisterUser"
import { UserType } from "../../../data/context/UserSession.jsx"
import { handleError } from "../../../services/ErrorRedirect"
import { api } from '../../../services/api'
import { parseCookies } from "nookies"
import { useRouter } from 'next/router'

export default function users() {
    const [content, setContent] = useState(null)
    const [userType, setUserType] = useState<UserType>(null)
    const router = useRouter()

    async function call() {
        try {
            const json = await api.get('/users')
            setContent(json.data)
        } catch (error) {
            handleError(router, error)
        }
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
                    <Table.Cell>{element.name}</Table.Cell>
                    <Table.Cell>{element.email}</Table.Cell>
                    <Table.Cell>{element.phone}</Table.Cell>
                    <Table.Cell>{element.type}</Table.Cell>
                    <Table.Cell>{element.metadata.createdBy}</Table.Cell>
                    <Table.Cell>{element.metadata.textCreatedAt}</Table.Cell>
                </Table.Row>
            )
        })
    }

    const uiManager = <Table>
        <Table.Header>
            <Table.Column>Id</Table.Column>
            <Table.Column>Nome</Table.Column>
            <Table.Column>E-mail</Table.Column>
            <Table.Column>Telefone</Table.Column>
            <Table.Column>Tipo</Table.Column>
            <Table.Column>Criado Por</Table.Column>
            <Table.Column>Criado Em</Table.Column>
        </Table.Header>
        <Table.Body>
            {getTable()}
        </Table.Body>
    </Table>

    const uiAdmin = <Container css={{ width: '100%' }}>
        <Row css={{ width: '100%' }}>
            <Col css={{ width: '25%' }}>
                <RegisterUser onRegistered={call} />
            </Col>
            <Col css={{ width: '75%' }}>
                {uiManager}
            </Col>
        </Row>
    </Container>

    return <>
        <Searchbox />
        {userType == 'ADMIN' ? uiAdmin : uiManager}
    </>
}