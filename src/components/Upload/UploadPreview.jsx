import styles from './uploadPopup.module.scss';

export default function UploadPreview({ file }) {
	if (!file) return null;
	const previewUrl = URL.createObjectURL(file);
	return (
		<img
			className={styles.uploadedImagePreview}
			src={previewUrl}
			alt='Uploaded'
		/>
	);
}
