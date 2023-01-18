import { useEffect, useState } from "react"
import GameItem from '../../../components/GameItem.jsx'
import Searchbox from "../../../components/Searchbox"
import { Grid } from "@nextui-org/react";
import { api } from '../../../services/api'

export default function gamesPending(ctx) {
    const [games, setGames] = useState(null)

    async function call() {
        const json = await api.get('/announcements/pending')
        setGames(json.data)
    }

    function generateList() {
        return games?.map((element) => {
            const { game, owner } = element
            return <GameItem
                key={game.id}
                game={game}
                owner={owner}
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