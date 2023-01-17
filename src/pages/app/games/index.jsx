import { useEffect, useState } from "react"
import GameItem from '../../../components/GameItem.jsx'
import Searchbox from "../../../components/Searchbox"
import { useRouter } from 'next/router'
import { Grid } from "@nextui-org/react";
import { api } from '../../../services/api'

export default function games() {
    const [games, setGames] = useState(null)
    const router = useRouter()

    async function call(text = "") {
        const json = await api.get('/games', {
            'title': text
        })
        setGames(json.data)
    }

    function generateList() {
        return games?.content?.map((game) => { return <GameItem key={game.id} game={game} /> })
    }

    function onSearchTyped(text) {
        call(text)
    }

    useEffect(() => {
        call()
    }, [])

    return <>
        <Searchbox onSearchTyped={onSearchTyped} />
        <Grid.Container gap={2} justify="flex-start">
            {generateList()}
        </Grid.Container>
    </>
}