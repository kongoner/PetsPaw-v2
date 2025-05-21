import styles from './searchButton.module.scss';
import { Link } from 'react-router-dom';

export default function SearchButton() {
    return (
        <Link  
            className={styles.searchButton}
            to='/search'
        >
            <img src="src/images/search-20.svg" alt="Search" />
        </Link>
    )
}