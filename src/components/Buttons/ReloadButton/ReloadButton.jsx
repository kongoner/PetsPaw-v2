import styles from './reloadButton.module.scss';

export default function ReloadButton({ onClick }) {
	return (
		<button className={styles.reloadButton} onClick={onClick}>
			<img
				src={`${import.meta.env.BASE_URL}images/update-20.svg`}
				alt='Reload'
			/>
		</button>
	);
}
