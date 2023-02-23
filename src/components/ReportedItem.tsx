import { Button, Modal, Grid } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { ItemType } from "../data/model/ItemType"
import { ReportData } from "../data/model/ReportData"
import { api } from "../services/api"
import Announcement from "./Announcement"

export default function ReportedItem(props) {
    const { reportData } = props
    const [announcement, setAnnouncement] = useState(null)
    const [visible, setVisible] = useState(false)

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    }

    async function loadAnnouncement(reportData: ReportData) {
        if (reportData) {
            const url = `/announcements/${reportData.id}`
            const json = await api.get(url)
            const element = json.data

            setVisible(true)

            const result = <Announcement
                key={element.id}
                game={element.game}
                owner={element.owner}
                announcement={{
                    id: element.id,
                    price: element.price,
                    enabled: element.enabled,
                }}
            />

            const data = <Grid.Container gap={2} justify="flex-start">
                {result}
            </Grid.Container>

            setAnnouncement(data)
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
                    alert('game')
                    break;
                }
            }
        }
    }

    useEffect(() => { openDetail(reportData) }, [reportData])

    return <>
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}>
            <Modal.Header>
                <h2>{reportData.type}</h2>
            </Modal.Header>
            <Modal.Body>
                {announcement}
            </Modal.Body>
            <Modal.Footer>
                <Button auto
                    flat
                    color="error"
                    onPress={closeHandler}>
                    Fechar
                </Button>
                <Button auto onPress={closeHandler}>
                    Sign in
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}