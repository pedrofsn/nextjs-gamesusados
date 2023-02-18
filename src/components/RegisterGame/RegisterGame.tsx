import { Image, Button, Input, Card, Spacer, Container } from "@nextui-org/react";
import React, { useState, useRef } from "react"
import { api } from "../../services/api";
import PlatformSelector from "../PlatformSelector";
import ImageSelector from "./ImageSelector";

export default function RegisterGame(props) {
    const [gameName, setGameName] = useState('');
    const [error, setError] = useState('default');
    const [filePath, setFilePath] = useState('');
    const [platformSelected, setPlatformSelected] = useState(null);

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

        if (filePath == '') {
            alert('Selecione uma imagem!')
            return
        }

        alert(filePath + platformSelected.key + platformSelected.name)
        // TODO => cadastrar imagem e depois o game
    }

    return <>
        <Card css={{ mw: "300px", margin: "1%" }}
            variant="bordered">
            <Card.Body>
                <ImageSelector onImageSelected={setFilePath} />
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