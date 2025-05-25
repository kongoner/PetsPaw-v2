import styles from './uploadPopup.module.scss';

export default function UploadMessage({ status }) {
	if (!status) return null;

	return (
		<div className={styles.uploadMessage}>
			<img
				src={
					status === 'success'
						? '/images/success-20.svg'
						: '/images/error-20.svg'
				}
				alt={status}
			/>
			<p>
				{status === 'success'
					? 'Thanks for the Upload - Cat found!'
					: 'No Cat found - try a different one'}
			</p>
		</div>
	);
}
