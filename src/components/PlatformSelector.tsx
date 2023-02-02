import { Dropdown } from "@nextui-org/react";
import React, { useState, useEffect } from "react"
import { api } from "../services/api";

export default function PlatformSelector(props) {
    const [menuItems, setMenuItems] = useState([]);
    const [selected, setSelected] = React.useState(new Set());
    const [platform, setPlatform] = useState('');
    const [error, setError] = useState('default');

    const [content, setContent] = useState(null)

    // async function call(platform) {
    //     const url = `/platforms/register/${platform}`
    //     try {
    //         const json = await api.post(url)
    //         const content = json.data

    //         if (content.id != null && content.message == null) {
    //             if (props.onRegistered != null) {
    //                 props.onRegistered("Plataforma cadastrada com sucesso!")
    //                 setPlatform('')
    //             }
    //         }
    //     } catch (err) {
    //         const content = err.response.data
    //         alert(content.message)
    //     }
    // }

    // function onPress() {
    //     if (platform == '') {
    //         setError('error')
    //         return
    //     }

    //     setError('default')

    //     call(platform)
    // }

    async function call() {
        const json = await api.get('/platforms')
        const items = json.data.map((element) => {
            return { 'key': element.id, 'name': element.title }
        })
        setMenuItems(items)
    }

    function selectedDisplay2() {
        const name = menuItems.find((element) => {
            return element.key == selected.currentKey
        })?.name
        return name != undefined ? name : "Selecione uma plataforma"
    }

    useEffect(() => { call() }, [])

    return <>
        <Dropdown>
            <Dropdown.Button flat color="primary" css={{ tt: "capitalize" }}>
                {selectedDisplay2()}
            </Dropdown.Button>
            <Dropdown.Menu
                items={menuItems}
                aria-label="Single selection actions"
                color="secondary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setSelected}

            >
                {(item) => (
                    <Dropdown.Item
                        key={item.key}
                        color={item.key === "delete" ? "error" : "default"}
                    >
                        {item.name}
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    </>
}