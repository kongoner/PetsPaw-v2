import styles from './searchBar.module.scss';
import SearchButton from '../Buttons/SearchButton/SearchButton.jsx';

export default function SearchBar() {
    return (
        <div className={styles.searchBarWrapper}>
            <input type="text" className={styles.searchBar} placeholder="Search for breeds by name" />
            <SearchButton />
        </div>
    )
}