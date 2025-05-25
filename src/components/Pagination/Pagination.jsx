import styles from './pagination.module.scss';

export default function Pagination({ page, setPage, totalPages }) {
	const handlePageChange = (newPage) => {
		if (
			newPage < 0 ||
			(typeof totalPages === 'number' && newPage >= totalPages)
		)
			return;
		setPage(newPage);
	};

	const isNextDisabled =
		typeof totalPages === 'number' && page + 1 >= totalPages;

	return (
		<div className={styles.pagination}>
			<button
				className={`${styles.paginationButton} ${page === 0 ? styles.disabled : ''}`}
				onClick={() => handlePageChange(page - 1)}
				disabled={page === 0}
			>
				<img src='./images/back-20.svg' alt='Previous Page' />
				Prev
			</button>
			<button
				className={`${styles.paginationButton} ${isNextDisabled ? styles.disabled : ''}`}
				onClick={() => handlePageChange(page + 1)}
				disabled={isNextDisabled}
			>
				Next
				<img src='./images/forward-20.svg' alt='Next Page' />
			</button>
		</div>
	);
}
