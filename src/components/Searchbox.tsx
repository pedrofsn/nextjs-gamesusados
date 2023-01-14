import styles from '../styles/Searchbox.module.css'
import useAppData from "../data/hook/useAppData"
import { Text } from "@nextui-org/react";
import Link from 'next/link';
import SystemSession from '../data/context/SystemSession'

export default function Searchbox(props) {
    const { systemSession } = useAppData()

    const userType: SystemSession = systemSession.userSession.usertype

    return <div className={styles.topnav}>
        <Text h3>Olá, {userType}!</Text>
        <Link href="/app/games">Games</Link>
        <Link href="/app/announcement/pending">Anúncios pendentes</Link>
        <a href="#contact">Contato</a>
        <input type="text"
            placeholder="Digite o nome do jogo.."
            onChange={(e) => props.onSearchTyped(e.target.value)}
        />
    </div>
}