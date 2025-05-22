import styles from './imageGrid.module.scss';
import Pagination from '../Pagination/Pagination';

export default function ImageGrid({ children }) {
    return (
        <div className={styles.gridWrapper}>
            <div className={styles.imageGrid}>
                {children}
            </div>
            <Pagination />
        </div>
    )
}