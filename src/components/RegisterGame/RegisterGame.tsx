import { Button, Input, Card, Spacer } from "@nextui-org/react";
import React, { useState, useRef } from "react"
import { api } from "../../services/api";
import PlatformSelector from "../PlatformSelector";
import ImageSelector from "./ImageSelector";

export default function RegisterGame(props) {
    const [gameName, setGameName] = useState('')
    const [error, setError] = useState('default')
    const [fileSelected, setFileSelected] = useState(null)
    const [platformSelected, setPlatformSelected] = useState(null)

    // TODO 'RegisterGame' uma vez que o jogo for cadastrado o form precisa ser limpado

    async function saveGame() {
        const idGame = await createGame()
        if (idGame != null) {
            const imageCreated = await createImageGame(idGame)
            if (imageCreated != null) {
                props.onGameSaved()
            }
        }
    }

    async function createGame() {
        const url = `/games/platform/${platformSelected.key}/title/${gameName}`
        const json = await api.post(url)
        const result = json.data

        if (result != null && result.id != null) {
            return result.id
        }
        return -1
    }

    async function createImageGame(idGame: number) {
        const url = `images/upload/games/${idGame}`
        const body = new FormData()
        body.append("file", fileSelected)

        const json = await api.post(url, body, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        const result = json.data
        if (result != null) {
            return result
        }
        return null
    }

    function tryToSave() {
        if (gameName == '') {
            setError('error')
            return
        } else {
            setError('default')
        }

        if (platformSelected == null) {
            alert('Selecione uma plataforma!')
            return
        }

        if (fileSelected == null) {
            alert('Selecione uma imagem!')
            return
        }

        saveGame()
    }

    return <>
        <Card css={{ mw: "300px", margin: "1%" }}
            variant="bordered">
            <Card.Body>
                <ImageSelector onImageSelected={setFileSelected} />
                <Spacer y={1.5} />
                <PlatformSelector onPlatformSelected={setPlatformSelected} />
                <Spacer y={1.5} />
                <Input
                    clearable
                    label="Cadastrar game"
                    color="default"
                    placeholder="Nome do game"
                    value={gameName}
                    status={error}
                    onChange={(element) => setGameName(element.target.value)}
                />
            </Card.Body>
            <Card.Footer>
                <Button auto flat
                    color="success"
                    onPress={tryToSave}>
                    Cadastrar
                </Button>
            </Card.Footer>
        </Card>
    </>
}