import styles from './dropdownLabeled.module.scss';

export default function dropdownLabeled({
	label,
	onChange,
	alt,
	disabled,
	children,
}) {
	return (
		<div className={styles.dropdownLabeledWrapper}>
			<span
				className={`${styles.labelOfDropdown} ${disabled ? styles.disabled : ''}`}
			>
				{label}
			</span>
			<div className={styles.dropdownWrapper}>
				<select
					className={`${styles.dropdownLight} ${disabled ? styles.disabled : ''}`}
					onChange={onChange}
					alt={alt}
					disabled={disabled}
				>
					{children}
				</select>
				<img
					src={`${import.meta.env.BASE_URL}images/dropdown-12.svg`}
					alt='Dropdown Arrow'
				/>
			</div>
		</div>
	);
}
