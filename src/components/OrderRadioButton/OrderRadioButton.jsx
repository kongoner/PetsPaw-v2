import styles from './orderRadioButton.module.scss';

export default function OrderRadioButton({ value, onChange, disabled }) {
	return (
		<div
			className={styles.orderWrapper}
			role='radiogroup'
			aria-label='Sort order'
		>
			<label
				className={`${styles.order} ${value === 'ASC' ? styles.active : ''} ${disabled ? styles.disabled : ''}`}
			>
				<input
					type='radio'
					name='order'
					value='ASC'
					onChange={onChange}
					hidden
					disabled={disabled}
				/>
				<img src='/images/sort-revert-color-20.svg' alt='Sort Ascending' />
			</label>
			<label
				className={`${styles.order} ${value === 'DESC' ? styles.active : ''} ${disabled ? styles.disabled : ''}`}
			>
				<input
					type='radio'
					name='order'
					value='DESC'
					onChange={onChange}
					hidden
					disabled={disabled}
				/>
				<img src='/images/sort-color-20.svg' alt='Sort Descending' />
			</label>
		</div>
	);
}
