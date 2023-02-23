import { useEffect, useState } from "react"
import GameItem from '../../../components/GameItem.jsx'
import Searchbox from "../../../components/Toolbar"
import { Col, Grid, Row, Container } from "@nextui-org/react";
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
        return games?.content?.map((game) => {
            return <>
                <Grid xs={6} sm={3} key={game.id}>
                    <GameItem key={game.id} game={game} />
                </Grid>
            </>
        })
    }

    function onSearchTyped(text) {
        call(text)
    }

    useEffect(() => {
        call()
    }, [])

    return <>
        <Searchbox onSearchTyped={onSearchTyped} />
        <Container css={{ width: '100%' }}>
            <Row css={{ width: '100%' }}>
                <Col css={{ width: '25%' }}>
                    <RegisterGame onGameSaved={() => call()} />
                </Col>
                <Col css={{ width: '75%' }}>
                    <Grid.Container gap={1} justify="flex-start">
                        {generateList()}
                    </Grid.Container>
                </Col>
            </Row>
        </Container>
    </>
}