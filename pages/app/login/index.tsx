import { useEffect, useState } from "react"
import { Input, Spacer } from "@nextui-org/react";
import GameItem from '../../../components/GameItem.jsx'
import { Button } from '@nextui-org/react';

export default function games() {
    const [games, setGames] = useState(null)

    async function call(text = "") {
        const url = text == "" ? "http://localhost:8080/games" : "http://localhost:8080/games?title=" + text
        const response = await fetch(url)
        const json = await response.json()
        setGames(json)
    }

    function generateList() {
        return games?.content?.map((game) => { return <GameItem key={game.id} game={game}/> })
    }
    
    useEffect(() => { /*call()*/ }, [])

    function onSearchTyped(text) {
        call(text)
    }

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    return <div className={`flex flex-col mtt-7`}>
        <Spacer y={1.5} />
        <Input clearable label="login" placeholder="login" />
        <Spacer y={1.5} />
        <Button>Click me</Button>
    </div>
}
