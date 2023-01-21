import { useEffect, useState } from "react"
import { Table } from "@nextui-org/react";
import { api } from '../../../services/api'
import Searchbox from "../../../components/Toolbar";

export default function platforms() {
    const [content, setContent] = useState(null)

    async function call() {
        const json = await api.get('/report')
        setContent(json.data)
    }

    useEffect(() => { call() }, [])

    function getTable() {
        return content?.content?.map((element) => {
            const { announcement, game } = element

            function getType(): string {
                if (announcement != null && game != null) {
                    return "Anúncio"
                } if (announcement == null && game != null) {
                    return "Game"
                } else {
                    return "Desconhecido"
                }
            }

            return (
                <Table.Row key={element.id}>
                    <Table.Cell>{element.description}</Table.Cell>
                    <Table.Cell>{getType()}</Table.Cell>
                    <Table.Cell>Ver detalhe</Table.Cell>
                </Table.Row>
            )
        })
    }

    return <>
        <Searchbox />
        <Table>
            <Table.Header>
                <Table.Column>Descrição</Table.Column>
                <Table.Column>Item denunciado</Table.Column>
                <Table.Column>Açao</Table.Column>
            </Table.Header>
            <Table.Body>
                {getTable()}
            </Table.Body>
        </Table>
    </>
}