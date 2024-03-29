import { useEffect, useState } from "react"
import { Table, Button } from "@nextui-org/react"
import { api } from '../../services/api'
import Searchbox from "../../components/Toolbar"
import { ItemType } from "../../data/model/ItemType"
import ReportedItem from "../../components/ReportedItem"
import { handleError } from "../../services/ErrorRedirect"
import { useRouter } from "next/router"

export default function platforms() {
    const [content, setContent] = useState(null)
    const [reportData, setReportData] = useState(null)
    const router = useRouter()

    async function call() {
        try {
            const json = await api.get('/report')
            setContent(json.data)
        } catch (error) {
            handleError(router, error)
        }
    }

    useEffect(() => { call() }, [])

    function getTable() {
        return content?.content?.map((element) => {
            const { announcement, game, metadata } = element
            var reported = ""

            function getType(): ItemType {
                if (announcement != null) {
                    reported = announcement.metadata.createdBy
                    return ItemType.Announcement
                } if (game != null) {
                    reported = game.metadata.createdBy
                    return ItemType.Game
                } else {
                    return ItemType.Unknown
                }
            }

            return (
                <Table.Row key={element.id}>
                    <Table.Cell>{metadata.createdBy}</Table.Cell>
                    <Table.Cell>{reported}</Table.Cell>
                    <Table.Cell>{metadata.textCreatedAt}</Table.Cell>
                    <Table.Cell>{element.description}</Table.Cell>
                    <Table.Cell>{getType()}</Table.Cell>
                    <Table.Cell><ReportedItem reportData={element} /></Table.Cell>
                </Table.Row>
            )
        })
    }

    // TODO [MELHORIA] marcar uma denúncia como "resolvida"

    return <>
        <Searchbox />
        <Table>
            <Table.Header>
                <Table.Column>Denunciante</Table.Column>
                <Table.Column>Denunciado</Table.Column>
                <Table.Column>Denunciado em</Table.Column>
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
