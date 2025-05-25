import styles from './dropdown.module.scss';

export default function Dropdown({ id, alt, onChange, disabled, children }) {
	return (
		<div className={styles.dropdownWrapper}>
			<select
				className={`${styles.dropdown} ${disabled ? styles.disabled : ''}`}
				id={id}
				alt={alt}
				onChange={onChange}
				disabled={disabled}
			>
				{children}
			</select>
			<img
				className={`${disabled ? styles.disabled : ''}`}
				src='./images/dropdown-12.svg'
				alt='Dropdown arrow'
			/>
		</div>
	);
}
