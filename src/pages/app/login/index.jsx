import React, { useState } from "react"
import { Container, Input, Spacer, Button, useInput } from "@nextui-org/react";

export default function games() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

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

      return
    }

    if (password == '') {

      return
    }

    async function call() {
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
          "Content-type": "application/json;charset=UTF-8",
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(body)
      })
      const json = await response.json()

      if (json.message != null) {
        alert(json.message)
      }
    }

    call()
  }

  return <Container xs>
    <h1 className="text-3xl font-bold underline">Login no sistema</h1>

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
    <Button onClick={tryLogin}>Entrar</Button>
  </Container>
}
