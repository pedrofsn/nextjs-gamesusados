import styles from '../../../styles/Games.module.css'
import GameItem from '../../../components/GameItem.jsx'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useAppData from "../../../data/hook/useAppData"

// está pegando os dados somente do lado do frontend!!!!
export default function gameDetail() {
    const router = useRouter()
    const [game, setGame] = useState(null)
    const { systemSession } = useAppData()

    async function call(id) {
        const origin = typeof window !== 'undefined' && window.location.origin
            ? window.location.origin.replace(window.location.port, '8080')
            : '';

        const url = `${origin}/games/` + id

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Accept-Encoding': 'application/gzip',
                'Authorization': 'Bearer ' + systemSession.userSession.token,
            }
        })
        const json = await response.json()
        setGame(json)
    }

    useEffect(() => { call(router.query.id) })

    return <>
        <span className={styles.title}>Games usados {router.query.id}</span>
        <div className={styles.page}>
            <GameItem game={game} />
        </div>
    </>
}