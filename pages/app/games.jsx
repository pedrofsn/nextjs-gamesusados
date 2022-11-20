import { useEffect, useState } from "react"
import styles from '../../styles/Games.module.css'

export default function games() {
    const [games, setGames] = useState(null)

    async function call() {
        const response = await fetch('http://localhost:8080/games')
        const json = await response.json()
        setGames(json)
    }

    function generateList() {
        if(games){
            const lines = []
            games.content.forEach(game => {
                const line = <div key={game.id} className={styles.game}>
                    <img src={game.image} alt={game.title} className={styles.image}/>
                    {game.title}
                    </div>
                lines.push(line)
            });

            return lines
        }
    }
    
    useEffect(() => { call() }, [])

    return <div className={styles.page}>{generateList()}</div>
}