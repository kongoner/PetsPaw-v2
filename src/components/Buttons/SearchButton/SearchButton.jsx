import styles from './searchButton.module.scss';

export default function SearchButton() {
	return (
		<button type='submit' className={styles.searchButton}>
			<img
				src={`${import.meta.env.BASE_URL}images/search-20.svg`}
				alt='Search'
			/>
		</button>
	);
}
