import { useEffect, useState } from "react"
import GameItem from '../../../components/GameItem.jsx'
import Searchbox from "../../../components/Toolbar"
import { Grid } from "@nextui-org/react";
import { api } from '../../../services/api'
import RegisterGame from "../../../components/RegisterGame/RegisterGame";

export default function games() {
    const [games, setGames] = useState(null)

    async function call(text = "") {
        const json = await api({
            method: 'get',
            url: '/games',
            params: {
                'title': text
            }
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
        <RegisterGame />
        <Grid.Container gap={2} justify="flex-start">
            {generateList()}
        </Grid.Container>
    </>
}