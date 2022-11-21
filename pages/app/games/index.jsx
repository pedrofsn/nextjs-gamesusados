import { useEffect, useState } from "react"
import GameItem from '../../../components/GameItem.jsx'
import Searchbox from "../../../components/Searchbox.jsx"
import styles from '../../../styles/Games.module.css'

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
    
    useEffect(() => { call() }, [])

    function onSearchTyped(text) {
        call(text)
    }

    return <>
        <Searchbox onSearchTyped={onSearchTyped}/>
        <div className={styles.page}>{generateList()}</div>
    </>
}