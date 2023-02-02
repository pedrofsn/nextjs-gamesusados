import { Card, Grid, Row, Text, Switch } from "@nextui-org/react";
import React, { useEffect, useState } from "react"
import Owner from './Owner.jsx'
import { api } from '../services/api'

export default function Announcement(props) {
  const { game, owner, announcement } = props
  const [isEnabled, setEnabled] = React.useState(announcement.enabled);

  async function call(id, isEnabled) {
    const url = `/announcements/${id}/toggle/${isEnabled}`
    const json = await api.post(url)
    console.log(json.data)
  }

  function updateAnnouncementStatus(enabled) {
    setEnabled(enabled)
    call(announcement.id, enabled)
  }

  const MockItem = ({ text }) => {
    return (
      <Card css={{ h: "$20", $$cardColor: '$colors$primary' }}>
        <Card.Body>
          <Text h6 size={15} color="white" css={{ m: 0 }}>
            {text}
          </Text>
        </Card.Body>
      </Card>
    );
  };

  useEffect(() => {
    setEnabled(announcement.isEnabled)
  })

  return (
    <Grid xs={6} sm={3} key={announcement.id}>
      <Card>
        <Card.Header css={{ p: 0 }}>
          <Card.Image
            src={game.image}
            objectFit="cover"
            width="100%"
            height="100%"
            alt={game.title}
          />
        </Card.Header>

        <Grid.Container gap={2} justify="center">
          <Grid xs={12} md={12}>
            {owner != null ? <Owner owner={owner} /> : <></>}
          </Grid>
          <Grid xs={12} md={6}>
            <MockItem text={owner.phone} />
          </Grid>
          <Grid xs={6} md={6} justify="center" alignItems="center">
            <Switch checked={isEnabled}
              onChange={(data) => updateAnnouncementStatus(data.target.checked)}
            />
          </Grid>
          <Grid xs={12} md={12}>
            <MockItem text={announcement.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })} />
          </Grid>
        </Grid.Container>
        <Card.Divider />
        <Card.Footer css={{ justifyItems: "flex-start" }}>
          <Row wrap="wrap" justify="space-between" align="center">
            <Text b>{game.title}</Text>
            <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
              {game.platform}
            </Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
}