import { Image, Button, Card } from "@nextui-org/react";
import React, { useState, useRef } from "react"

interface ImageSelectorProps {
    onImageSelected: (MediaSource) => void
}

export default function ImageSelector(props: ImageSelectorProps) {
    const [hasImageSelected, setImageAsSelected] = useState(false);
    const hiddenFileInput = useRef(null);
    const [file, setFile] = useState('');

    function selectFile(firstFile: MediaSource) {
        const filePath = URL.createObjectURL(firstFile);
        setFile(filePath);
        setImageAsSelected(true);
        props.onImageSelected(firstFile)
    };

    function openFileSelector() {
        hiddenFileInput.current.click()
    }

    // TODO 'ImageSelector' uma vez que o jogo for cadastrado o form precisa ser limpado

    return <>
        <Card.Body>
            {
                hasImageSelected
                    ? <Image
                        showSkeleton
                        width={320}
                        height={180}
                        src={file}
                        objectFit="cover"
                    />
                    : null
            }
            <input type="file"
                ref={hiddenFileInput}
                onChange={(element) => selectFile(element.target.files[0])}
                accept="image/*"
                style={{ display: 'none' }} />
            <Button auto flat
                color="warning"
                onPress={openFileSelector}>
                {hasImageSelected ? 'Alterar imagem' : 'Selecionar imagem'}
            </Button>
        </Card.Body>
    </>
}