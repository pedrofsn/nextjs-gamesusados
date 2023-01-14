import { useEffect, useState } from "react"
import useAppData from "../../../data/hook/useAppData"
import GameItem from '../../../components/GameItem.jsx'
import Searchbox from "../../../components/Searchbox"
import { useRouter } from 'next/router'
import { Grid } from "@nextui-org/react";
import SystemSession from '../../../data/context/SystemSession'
import UserSession from '../../../data/context/UserSession'
import Cookies from 'js-cookie'

export default function gamesPending(props) {
    const [games, setGames] = useState(null)
    const router = useRouter()

    async function call(token) {
        const origin = typeof window !== 'undefined' && window.location.origin
            ? window.location.origin.replace(window.location.port, '8080')
            : '';

        const url = `${origin}/announcements/pending`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "acucar": "vinagre",
                'Authorization': `Bearer ${token}`,
            }
        })
        const json = await response.json()
        setGames(json)
    }

    function generateList() {
        return games?.map((element) => {
            const game = element.game
            const owner = element.owner
            console.log('jogo do ' + JSON.stringify(owner))
            return <GameItem key={game.id} game={game} />
        })
    }

    useEffect(() => {
        const cookie = Cookies.get('gamesusados-session')
        const systemSession: SystemSession = JSON.parse(cookie)
        const userSession: UserSession = systemSession.userSession
        const token: string = userSession.token
        call(token)
    }, [])

    return <>
        <Searchbox />
        <Grid.Container gap={2} justify="flex-start">
            {generateList()}
        </Grid.Container>
    </>
}