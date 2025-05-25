import styles from './uploadButton.module.scss';

export default function UploadButton({ onClick }) {
	return (
		<button className={styles.uploadButton} onClick={onClick}>
			<img
				src={`${import.meta.env.BASE_URL}images/upload-16.svg`}
				alt='Upload'
			/>
			Upload
		</button>
	);
}
