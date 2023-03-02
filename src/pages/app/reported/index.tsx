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

            function getType(): ItemType {
                if (announcement != null && game != null) {
                    return ItemType.Announcement
                } if (announcement == null && game != null) {
                    return ItemType.Game
                } else {
                    return ItemType.Unknown
                }
            }

            const data = new ReportData(element.id, getType())

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

    // TODO acrescentar colunas para data e hora da denúncia.
    // TODO terá algo pra marcar uma denúncia como "lida"?

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

