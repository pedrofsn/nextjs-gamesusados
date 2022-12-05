import styles from '../../../styles/Games.module.css'
import GameItem from '../../..//components/GameItem.jsx'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// está pegando os dados somente do lado do frontend!!!!
export default function gameDetail() {
    const router = useRouter()
    const [game, setGame] = useState(null)

    async function call(id) {
        const response = await fetch('http://localhost:8080/games/' + id)
        const json = await response.json()
        
        setGame(json)
    }

    return <>
        <span className={styles.title}>Games usados {router.query.id}</span>
        <div className={styles.page}>
            <GameItem game={call(router.query.id)}/>
        </div>
    </>
}