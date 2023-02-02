import { Button, Input, Card, Spacer } from "@nextui-org/react";
import React, { useState } from "react"
import { api } from "../services/api";
import PlatformSelector from "./PlatformSelector";

export default function RegisterGame(props) {
    const [title, setTitle] = useState('');
    const [platform, setPlatform] = useState('');
    const [error, setError] = useState('default');

    async function call(platform) {
        const url = `/platforms/register/${platform}`
        try {
            const json = await api.post(url)
            const content = json.data

            if (content.id != null && content.message == null) {
                if (props.onRegistered != null) {
                    props.onRegistered("Plataforma cadastrada com sucesso!")
                    setPlatform('')
                }
            }
        } catch (err) {
            const content = err.response.data
            alert(content.message)
        }
    }

    function onPress() {
        if (platform == '') {
            setError('error')
            return
        }

        setError('default')

        call(platform)
    }

    return <>
        <Card css={{ mw: "300px", margin: "1%" }}
            variant="bordered">
            <Card.Body>
                <PlatformSelector />
                <Spacer y={1.5} />
                <Input
                    clearable
                    label="Cadastrar game"
                    color="default"
                    placeholder="Nome do game"
                    value={platform}
                    status={error}
                    onChange={(element) => setPlatform(element.target.value)}
                />
            </Card.Body>
            <Card.Footer>
                <Button auto flat
                    color="default"
                    onPress={onPress}>
                    Cadastrar
                </Button>
            </Card.Footer>
        </Card>
    </>
}