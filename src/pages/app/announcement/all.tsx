import { useEffect, useState } from "react"
import { Grid } from "@nextui-org/react";
import { api } from '../../../services/api'
import Announcement from "../../../components/Announcement";
import Searchbox from "../../../components/Toolbar";

export default function gamesPending(ctx) {
    const [content, setContent] = useState(null)

    async function call() {
        const json = await api.get('/announcements/all')
        setContent(json.data)
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

    useEffect(() => { call() }, [])

    return <>
        <Searchbox />
        <Grid.Container gap={2} justify="flex-start">
            {generateList()}
        </Grid.Container>
    </>
}