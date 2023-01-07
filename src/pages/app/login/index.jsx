import React, { useState } from "react"
import { Card, Text, Row, Progress, Badge, Container, Input, Spacer, Button, useInput } from "@nextui-org/react"
import useAppData from "../../../data/hook/useAppData"

export default function games() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('123456')
  const [isErrorInvisible, setErrorAsInvisible] = React.useState(true);
  const [error, setError] = useState('')
  const [isLoading, setLoading] = React.useState(false);
  const { systemSession, updateUserSession, logout } = useAppData()

  function updateData(updateFunction, e) {
    updateFunction(e.target.value)
  }

  const { value, reset, bindings } = useInput("");

  const validateEmail = (value) => {
    return value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);
  };

  const helper = React.useMemo(() => {
    if (!value)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(value);
    if (isValid) {
      setLogin(value)
    } else {
      setLogin('')
    }

    return {
      text: isValid ? "E-mail digitado corretamente" : "Digite um e-mail válido",
      color: isValid ? "success" : "error",
    };
  }, [value]);

  function tryLogin() {
    if (login == '') {
      setError("Preencha o campo e-mail")
      setErrorAsInvisible(false)
      setLoading(false)
      return
    }

    if (password == '') {
      setError("Preencha o campo senha")
      setErrorAsInvisible(false)
      setLoading(false)
      return
    }

    async function call() {
      setLoading(true)
      const origin = typeof window !== 'undefined' && window.location.origin
        ? window.location.origin.replace(window.location.port, '8080')
        : '';

      const body = {
        email: login,
        password: password
      }

      const url = `${origin}/auth`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Accept-Encoding': 'application/gzip',
        },
        body: JSON.stringify(body)
      })
      const json = await response.json()

      if (json.message != null) {
        setError(json.message)
        setErrorAsInvisible(false)
        setLoading(false)
        logout()
      } else {
        setError('')
        setErrorAsInvisible(true)
        setLoading(false)
        updateUserSession({
          usertype: json.usertype,
          token: json.token
        })
      }
    }

    call()
  }

  return <Container xs>
    <Card>
      <Card.Header>
        <Text b size={30}>Login no sistema</Text>
      </Card.Header>
      <Card.Body>
        <Row justify="center" align="center" alignItems="center">
          <Input
            {...bindings}
            clearable
            shadow={false}
            onClearClick={reset}
            status={helper.color}
            color={helper.color}
            helperColor={helper.color}
            helperText={helper.text}
            fullWidth={true}
            type="email"
            label="Email"
            placeholder="Digite o seu e-mail"
          />
          <Spacer y={1.5} />
          <Input.Password
            clearable
            label="password"
            placeholder="password"
            fullWidth={true}
            value={password}
            onChange={(value) => updateData(setPassword, value)}
          />

        </Row>
        {(!isLoading && !isErrorInvisible) ? <Spacer y={2.0} /> : ""}
        <Row justify="center">
          {(!isLoading && !isErrorInvisible) ? <Badge color="error" isInvisible={isErrorInvisible}>{error}</Badge> : ""}
          {(isLoading) ? <Progress
            indeterminated
            value={50}
            color="primary"
            status="primary"
          /> : ""}
        </Row>
        <Spacer y={1.5} />
        <Row justify="center">
          {(!isLoading) ? <Button onPress={tryLogin}>Entrar</Button> : ""}
        </Row>
      </Card.Body>
    </Card>
  </Container>
}
