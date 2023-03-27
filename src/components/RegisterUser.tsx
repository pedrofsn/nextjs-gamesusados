import { Button, Input, Card, Spacer, Text } from "@nextui-org/react"
import React, { useState } from "react"
import { api } from "../services/api"

export default function RegisterPlatform(props) {
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorFullname, setErrorFullname] = useState('default')
    const [errorPhone, setErrorPhone] = useState('default')
    const [errorEmail, setErrorEmail] = useState('default')
    const [errorPassword, setErrorPassword] = useState('default')

    function resetInputStatus() {
        setErrorFullname('default')
        setErrorPhone('default')
        setErrorEmail('default')
        setErrorPassword('default')
    }

    function resetForm() {
        setFullname('')
        setPhone('')
        setEmail('')
        setPassword('')
    }

    async function register() {
        const url = `/users/register/manager`
        try {
            const json = await api.post(url, {
                name: fullname,
                phone: phone,
                email: email,
                password: password
            })
            const content = json.data

            if ('MANAGER' == content.usertype && content.token != null && content.message == null) {
                if (props.onRegistered != null) {
                    props.onRegistered("Usuário cadastrado com sucesso!")
                    resetInputStatus()
                    resetForm()
                }
            }
        } catch (err) {
            const content = err.response.data
            alert(content.message)
        }
    }

    function onPress() {
        var hasError = false

        if (fullname == '') {
            setErrorFullname('error')
            hasError = true
        } else {
            setErrorFullname('success')
        }

        if (phone == '') {
            setErrorPhone('error')
            hasError = true
        } else {
            setErrorPhone('success')
        }

        if (email == '') {
            setErrorEmail('error')
            hasError = true
        } else {
            setErrorEmail('success')
        }

        if (password == '') {
            setErrorPassword('error')
            hasError = true
        } else {
            setErrorPassword('success')
        }

        if (hasError == false) {
            resetInputStatus()
            register()
        }
    }

    return <>
        <Card css={{ mw: "300px", margin: "1%" }}
            variant="bordered">
            <Card.Header>
                <Text b>Cadastro de usuário</Text>
            </Card.Header>
            <Card.Body>
                <Spacer y={0.5} />
                <Input
                    color="default"
                    labelPlaceholder="Nome completo"
                    value={fullname}
                    status={errorFullname}
                    onChange={(element) => setFullname(element.target.value)}
                />
                <Spacer y={1.5} />
                <Input
                    clearable
                    color="default"
                    labelPlaceholder="E-mail"
                    value={email}
                    status={errorEmail}
                    onChange={(element) => setEmail(element.target.value)}
                />
                <Spacer y={1.5} />
                <Input
                    color="default"
                    labelPlaceholder="Celular"
                    placeholder="phone"
                    value={phone}
                    status={errorPhone}
                    onChange={(element) => setPhone(element.target.value)}
                />
                <Spacer y={1.5} />
                <Input.Password
                    color="default"
                    labelPlaceholder="Senha"
                    value={password}
                    status={errorPassword}
                    onChange={(element) => setPassword(element.target.value)}
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