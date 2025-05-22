import styles from './dropdown.module.scss';

export default function Dropdown({ id, alt, onChange, children }) {
    return (
        <div className={styles.dropdownWrapper}>
            <select
                className={styles.dropdown}
                id={id}
                alt={alt}
                onChange={onChange}
            >
                {children}
            </select>
            <img src='src/images/dropdown-12.svg' alt='Dropdown arrow' />
        </div>
    );
}