import styles from './searchButton.module.scss';

export default function SearchButton() {
	return (
		<button type='submit' className={styles.searchButton}>
			<img src='/images/search-20.svg' alt='Search' />
		</button>
	);
}
