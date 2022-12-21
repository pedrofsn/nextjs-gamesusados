import React, { useState } from "react"
import { Container, Input, Spacer, Button, useInput } from "@nextui-org/react";
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'

export default function games() {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

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

  }

  return <Container xs>
    <h1 className="text-3xl font-bold underline">Hello world {password}!</h1>
    <div>
      The current theme is: {type}
      <Switch
        checked={isDark}
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      />
    </div>
    <Input
      {...bindings}
      clearable
      shadow={false}
      onClearClick={reset}
      status={helper.color}
      color={helper.color}
      helperColor={helper.color}
      helperText={helper.text}
      type="email"
      label="Email"
      placeholder="Digite o seu e-mail"
    />
    <Spacer y={1.5} />
    <Input clearable
      onClearClick={reset} label="login" placeholder="login" fullWidth={true} value={login} onChange={(value) => updateData(setLogin, value)} />
    <Spacer y={1.5} />
    <Input.Password clearable label="password" placeholder="password" fullWidth={true} value={password} onChange={(value) => updateData(setPassword, value)} />
    <Spacer y={1.5} />
    <Button onClick={tryLogin}>Login</Button>
  </Container>
}
