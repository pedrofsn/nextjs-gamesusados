import { useEffect, useState } from "react"
import { Table, Button } from "@nextui-org/react";
import { api } from '../../../services/api'
import Searchbox from "../../../components/Toolbar";
import { ItemType } from "../../../data/model/ItemType";
import { ReportData } from "../../../data/model/ReportData";
import ReportedItem from "../../../components/ReportedItem";

export default function platforms() {
    const [content, setContent] = useState(null)
    const [reportData, setReportData] = useState(null)

    async function call() {
        const json = await api.get('/report')
        setContent(json.data)
    }

    useEffect(() => { call() }, [])

    function getTable() {
        return content?.content?.map((element) => {
            const { announcement, game } = element
            var type: ItemType

            function getType(): string {
                if (announcement != null && game != null) {
                    type = ItemType.Announcement
                    return "Anúncio"
                } if (announcement == null && game != null) {
                    type = ItemType.Game
                    return "Game"
                } else {
                    type = ItemType.Unknown
                    return "Desconhecido"
                }
            }

            getType()
            const data = new ReportData(element.id, type)

            return (
                <Table.Row key={element.id}>
                    <Table.Cell>{element.description}</Table.Cell>
                    <Table.Cell>{getType()}</Table.Cell>
                    <Table.Cell>
                        <Button onPress={() => setReportData(data)}>Ver detalhe</Button>
                    </Table.Cell>
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
        <ReportedItem reportData={reportData} />
    </>
}

