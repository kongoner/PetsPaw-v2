import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './searchBar.module.scss';
import SearchButton from '../Buttons/SearchButton/SearchButton.jsx';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchBarWrapper}>
            <input
                type="text"
                className={styles.searchBar}
                placeholder="Search for breeds by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton />
        </form>
    );
}