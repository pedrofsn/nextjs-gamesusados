import { Card, Grid, Row, Text, Switch, Container, Col, Spacer } from "@nextui-org/react";
import React, { useEffect, useState } from "react"
import Owner from './Owner.jsx'
import { api } from '../services/api'

export default function Announcement(props) {
  const { game, owner, announcement } = props
  const [isEnabled, setEnabled] = useState(announcement.enabled);

  async function call(id, isEnabled) {
    const url = `/announcements/${id}/toggle/${isEnabled}`
    const json = await api.post(url)
    console.log(json.data)
  }

  function updateAnnouncementStatus(enabled) {
    setEnabled(enabled)
    call(announcement.id, enabled)
  }

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
        <Card.Body>
          {owner != null ? <Owner owner={owner} /> : <></>}
          <Spacer y={0.5} />
          <Container css={{ width: '100%' }}>
            <Row css={{ width: '100%' }}>
              <Col css={{ width: '20%' }}>
                <Switch checked={isEnabled}
                  onChange={(data) => updateAnnouncementStatus(data.target.checked)}
                />
              </Col>
              <Col css={{ width: '50%' }}>
                <Text>{announcement.enabled ? "Anúncio ativado" : "Anúncio desativado"}</Text>
              </Col>
            </Row>
          </Container>
        </Card.Body>
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