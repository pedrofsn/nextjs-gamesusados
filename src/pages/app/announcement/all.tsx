import { useEffect, useState } from "react"
import { Grid } from "@nextui-org/react"
import { api } from '../../../services/api'
import Announcement from "../../../components/Announcement"
import Searchbox from "../../../components/Toolbar"
import { useRouter } from "next/router"
import { handleError } from "../../../services/ErrorRedirect"

export default function gamesPending(ctx) {
    const [content, setContent] = useState(null)
    const router = useRouter()

    async function call() {
        try {
            const url = `/announcements/all`
            const json = await api.get(url)
            setContent(json.data)
        } catch (error) {
            handleError(router, error)
        }
    }

    function generateList() {
        return content?.map((element) => {
            return <Grid xs={6} sm={3} key={element.id}>
                <Announcement
                    key={element.id}
                    game={element.game}
                    owner={element.owner}
                    announcement={{
                        id: element.id,
                        price: element.price,
                        enabled: element.enabled,
                        priceMasked: element.priceMasked
                    }}
                />
            </Grid>
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