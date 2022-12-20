import styles from '../styles/Searchbox.module.css'
import { useState } from 'react'

export default function Searchbox(props) {
    return <div className={styles.topnav}>
        <a className={styles.active} href="#games">Games</a>
        <a href="#about">Sobre</a>
        <a href="#contact">Contato</a>
        <input type="text" placeholder="Digite o nome do jogo.." onChange={(e) => props.onSearchTyped(e.target.value)} />
    </div>
}