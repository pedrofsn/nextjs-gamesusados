import { User, Spacer } from "@nextui-org/react"

export default function Owner(props) {
  const { owner } = props
  return <>
    <User
      src={owner.image != null ? owner.image : null}
      name={owner.name}
      text={owner.image != null ? null : owner.name[0]}
      size="xl"
      color="default">
      <User.Link href={`tel:${owner.phone}`}>{owner.phone}</User.Link>
      <Spacer y={0.1} />
      <User.Link href={`mailto:${owner.email}`}>{owner.email}</User.Link>
    </User>
  </>
}