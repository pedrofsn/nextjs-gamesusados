import React, { useState } from "react"
import { Progress, Badge, Container, Input, Spacer, Button, useInput } from "@nextui-org/react";
import useAppData from "../../../data/hook/useAppData";

export default function games() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isErrorInvisible, setErrorAsInvisible] = React.useState(true);
  const [error, setError] = useState('')
  const [isLoading, setLoading] = React.useState(false);
  const context = useAppData()

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
      } else {
        setError('')
        setErrorAsInvisible(true)
        setLoading(false)

        /**
         * token: xpto
         * usertype: MANAGER
         * type: bearer
         * **/
      }
    }

    call()
  }

  return <Container xs>
    <h1 className="text-3xl font-bold underline">Login no sistema</h1>
    <h3>{context.usertype}</h3>
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
    <Spacer y={1.5} />
    {(!isLoading && !isErrorInvisible) ? <Badge color="error" isInvisible={isErrorInvisible}>{error}</Badge> : ""}

    {(isLoading) ? <Progress
      indeterminated
      value={50}
      color="primary"
      status="primary"
    /> : ""}

    {(!isLoading) ? <Button onPress={tryLogin}>Entrar</Button> : ""}
  </Container>
}
