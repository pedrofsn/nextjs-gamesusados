import { Card, Row, Text } from "@nextui-org/react";
import Owner from './Owner.jsx'

export default function GameItem(props) {
  const { game, owner } = props

  return (
    <Card isPressable>
      <Card.Header css={{ p: 0 }}>
        <Card.Image
          src={game.image}
          objectFit="cover"
          width="100%"
          height="100%"
          alt={game.title}
        />
      </Card.Header>
      {owner != null ? <Owner owner={owner} /> : <></>}
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
  );
}