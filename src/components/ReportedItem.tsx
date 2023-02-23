import { Modal, Grid } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { ItemType } from "../data/model/ItemType"
import { ReportData } from "../data/model/ReportData"
import { api } from "../services/api"
import Announcement from "./Announcement"
import GameItem from "./GameItem"

export default function ReportedItem(props) {
    const { reportData } = props
    const [content, setContent] = useState(null)
    const [visible, setVisible] = useState(false)

    const onCloseModal = () => { setVisible(false) }

    async function loadAnnouncement(reportData: ReportData) {
        if (reportData) {
            const url = `/announcements/${reportData.id}`
            const json = await api.get(url)
            const element = json.data

            setVisible(true)

            const data = <Grid.Container gap={2} justify="flex-start">
                <Announcement
                    key={element.id}
                    game={element.game}
                    owner={element.owner}
                    announcement={{
                        id: element.id,
                        price: element.price,
                        enabled: element.enabled,
                    }}
                />
            </Grid.Container>

            setContent(data)
        }
    }

    async function loadGame(reportData: ReportData) {
        if (reportData) {
            const url = `/games/${reportData.id}`
            const json = await api.get(url)
            const element = json.data

            setVisible(true)

            const data = <Grid.Container gap={2} justify="flex-start">
                <GameItem key={element.id} game={element} />
            </Grid.Container>

            setContent(data)
        }
    }

    function openDetail(reportData: ReportData) {
        if (reportData) {
            switch (reportData.type) {
                case ItemType.Announcement: {
                    loadAnnouncement(reportData)
                    break;
                }
                case ItemType.Game: {
                    loadGame(reportData)
                    break;
                }
            }
        }
    }

    useEffect(() => { openDetail(reportData) }, [reportData])

    return <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={onCloseModal}>
        <Modal.Header>
            <h2>{reportData?.type}</h2>
        </Modal.Header>
        <Modal.Body>
            {content}
        </Modal.Body>
    </Modal>
}