import styles from '../styles/GameItem.module.css'

export default function GameItem(props) {
    const game = props.game
    return <div key={game.id} className={styles.game}>
        <img src={game.image} alt={game.title} className={styles.image}/>
        <p>{game.title}</p>
    </div>
}