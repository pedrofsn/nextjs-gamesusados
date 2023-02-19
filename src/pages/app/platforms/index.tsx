import { useEffect, useState } from "react"
import { Table, Container, Row, Col } from "@nextui-org/react";
import { api } from '../../../services/api'
import Searchbox from "../../../components/Toolbar";
import RegisterPlatform from "../../../components/RegisterPlatform";

export default function platforms() {
    const [content, setContent] = useState(null)

    function onRegistered(text) {
        call()
    }

    async function call() {
        const json = await api.get('/platforms')
        setContent(json.data)
    }

    useEffect(() => { call() }, [])

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

    return <>
        <Searchbox />
        <Container css={{ width: '100%' }}>
            <Row css={{ width: '100%' }}>
                <Col css={{ width: '25%' }}>
                    <RegisterPlatform onRegistered={onRegistered} />
                </Col>
                <Col css={{ width: '75%' }}>
                    <Table>
                        <Table.Header>
                            <Table.Column>Id</Table.Column>
                            <Table.Column>Plataforma</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {getTable()}
                        </Table.Body>
                    </Table>
                </Col>
            </Row>
        </Container>
    </>
}