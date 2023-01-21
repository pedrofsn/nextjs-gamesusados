import { User } from "@nextui-org/react";

export default function Owner(props) {
  const { owner } = props
  return <User
    name={owner.name}
    description={owner.email}
    text={owner.name[0]}
    size="xl"
    squared
  />;
}