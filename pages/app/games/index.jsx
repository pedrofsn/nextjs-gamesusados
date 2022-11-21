import { useEffect, useState } from "react"
import GameItem from '../../../components/GameItem.jsx'
import styles from '../../../styles/Games.module.css'

export default function games() {
    const [games, setGames] = useState(null)

    async function call() {
        const response = await fetch('http://localhost:8080/games')
        const json = await response.json()
        setGames(json)
    }

    function generateList() {
        return games?.content?.map((game) => { return <GameItem key={game.id} game={game}/> })
    }
    
    useEffect(() => { call() }, [])

    return <div className={styles.page}>{generateList()}</div>
}