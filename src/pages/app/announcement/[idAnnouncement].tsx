import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { Grid } from "@nextui-org/react"
import { api } from '../../../services/api'
import Announcement from "../../../components/Announcement"
import Searchbox from "../../../components/Toolbar"

export default function announcementDetail() {
    const [content, setContent] = useState([])
    const router = useRouter()
    const idAnnouncement = router.query.idAnnouncement

    async function call(idAnnouncement) {
        if (idAnnouncement) {
            const url = `/announcements/${idAnnouncement}`
            const json = await api.get(url)
            const array = []
            array.push(json.data)
            setContent(array)
        }
    }

    function generateList() {
        return content?.map((element) => {
            return <Announcement
                key={element.id}
                game={element.game}
                owner={element.owner}
                announcement={{
                    id: element.id,
                    price: element.price,
                    enabled: element.enabled,
                }}
            />
        })
    }

    useEffect(() => { call(idAnnouncement) }, [idAnnouncement])

    return <>
        <Searchbox />
        <Grid.Container gap={2} justify="flex-start">
            {generateList()}
        </Grid.Container>
    </>
}