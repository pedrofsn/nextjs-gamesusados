import { useEffect, useState } from "react"

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
                const line = <li key={game.id}>{game.title}</li>
                lines.push(line)
            });

            return lines
        }
    }
    
    useEffect(() => { call() }, [])

    return <ul>{generateList()}</ul>
}