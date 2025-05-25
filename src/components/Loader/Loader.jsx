import styles from './loader.module.scss';

export default function Loader() {
	return (
		<img
			className={styles.loader}
			src={`${import.meta.env.BASE_URL}images/loader-100.svg`}
			alt='Loading'
		/>
	);
}
