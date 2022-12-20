import { useState } from "react"
import { Container, Input, Spacer, Button } from "@nextui-org/react";

export default function games() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return <Container xs>
        <Input clearable label="login" placeholder="login" fullWidth={true} value={login} />
        <Spacer y={1.5} />
        <Input.Password clearable label="password" placeholder="password" fullWidth={true} value={password} />
        <Spacer y={1.5} />
        <Button>Click me</Button>
    </Container>
}
