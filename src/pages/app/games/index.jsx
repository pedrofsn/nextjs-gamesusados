import { useEffect, useState } from "react"
import GameItem from '../../../components/GameItem.jsx'
import ModalGameItem from '../games/ModalGameItem'
import Searchbox from "../../../components/Searchbox.jsx"
import { useRouter } from 'next/router'
import { Grid } from "@nextui-org/react";

export default function games() {
    const [games, setGames] = useState(null)
    const router = useRouter()

    async function call(text = "") {
        const origin = typeof window !== 'undefined' && window.location.origin
            ? window.location.origin.replace(window.location.port, '8080')
            : '';

        const url = text == "" ? `${origin}/games` : `${origin}/games?title=` + text
        const response = await fetch(url)
        const json = await response.json()
        setGames(json)
    }

    function generateList() {
        return games?.content?.map((game) => { return <GameItem key={game.id} game={game} /> })
    }

    useEffect(() => { call() }, [])

    function onSearchTyped(text) {
        call(text)
    }

    return <>
        <Searchbox onSearchTyped={onSearchTyped} />
        <Grid.Container gap={2} justify="flex-start">
            {generateList()}
        </Grid.Container>
        <ModalGameItem></ModalGameItem>
    </>
}