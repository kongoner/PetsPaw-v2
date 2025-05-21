import styles from './backButton.module.scss';

export default function BackButton() {
    return (
        <button className={styles.backButton}>
            <img src="src/images/back-20.svg" alt="Back" />
        </button>
    )
}