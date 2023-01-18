import { Card, User, Text, Spacer } from "@nextui-org/react";

export default function Owner(props) {
  const { owner } = props
  console.log('owner : ' + JSON.stringify(owner))
  return <>
    <Card.Divider />
    <Card.Body>
      <User
        name={owner.name}
        description={owner.email}
        text={owner.name[0]}
        size="xl"
        squared
      />
      <Spacer y={0.5} />
      <Text>{owner.phone}</Text>
      <Spacer y={1.5} />
    </Card.Body>
  </>;
}