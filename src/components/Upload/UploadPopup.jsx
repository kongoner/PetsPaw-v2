import styles from './uploadPopup.module.scss';
import UploadForm from './UploadForm';
import UploadMessage from './UploadMessage';

export default function UploadPopup({ onClose }) {
	return (
		<div className={styles.uploadWrapper}>
			<div className={styles.uploadPopup}>
				<button className={styles.btnClose} onClick={onClose}>
					<img src='/images/close-20.svg' alt='Close' />
				</button>
				<UploadForm />
				<UploadMessage />
			</div>
		</div>
	);
}
