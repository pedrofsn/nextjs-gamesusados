import React, { useEffect, useState } from "react"
import { Card, Text, Row, Progress, Badge, Container, Input, Spacer, Button, useInput } from "@nextui-org/react"
import useAppData from "../../data/hook/useAppData"
import { useRouter } from 'next/router'
import { api } from '../../services/api'
import UserSession from "../../data/context/UserSession"

export default function games() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('123456')
  const [isErrorInvisible, setErrorAsInvisible] = React.useState(true);
  const [error, setError] = useState('')
  const [isLoading, setLoading] = React.useState(false);
  const { loadSession, saveSession, logout } = useAppData()
  const router = useRouter()

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

      try {
        const response = await api.post('/auth', {
          email: login,
          password: password
        })

        const json = response.data
        const userSession: UserSession = {
          usertype: json.usertype,
          token: json.token
        }

        setError('')
        setErrorAsInvisible(true)
        setLoading(false)
        saveSession(userSession)
        router.push('/app/games')
      } catch (err) {
        const json = err.response.data
        setError(json.message)
        setErrorAsInvisible(false)
        setLoading(false)
      }
    }

    call()
  }

  useEffect(() => {
    // TODO [MELHORIA] verificar na API se este token está válido
    if (loadSession()) {
      router.push('/app/games')
    }
  })

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
// TODO [PENDENTE] Lista de usuários cadastrados
// TODO [PENDENTE] Cadastro de usuário do tipo gerente (por parte do admin)