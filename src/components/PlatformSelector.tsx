import { Dropdown } from "@nextui-org/react";
import React, { useState, useEffect } from "react"
import { api } from "../services/api";

export default function PlatformSelector(props) {
    const [menuItems, setMenuItems] = useState([]);
    const [selected, setSelected] = React.useState(new Set());

    async function call() {
        const json = await api.get('/platforms')
        const items = json.data.map((element) => {
            return { 'key': element.id, 'name': element.title }
        })
        setMenuItems(items)
    }

    function displaySelectedItem() {
        const selectedItem = menuItems.find((element) => {
            return element.key == selected.currentKey
        })
        const name = selectedItem?.name
        const hasSelected = name != undefined
        if (hasSelected && selectedItem != null) {
            props.onPlatformSelected(selectedItem)
        }
        return hasSelected ? name : "Selecione uma plataforma"
    }

    useEffect(() => { call() }, [])

    return <>
        <Dropdown>
            <Dropdown.Button flat color="primary" css={{ tt: "capitalize" }}>
                {displaySelectedItem()}
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