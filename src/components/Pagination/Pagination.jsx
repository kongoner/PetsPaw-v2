import styles from './pagination.module.scss';

export default function Pagination() {
    return (
        <div className={styles.pagination}>
            <button className={styles.paginationButton}>
                <img src="images/back-20.svg" alt="Previous Page" />
                Prev
            </button>
            <button className={styles.paginationButton}>
                Next
                <img src="src/images/forward-20.svg" alt="Next Page" />
            </button>
        </div>
    )
}