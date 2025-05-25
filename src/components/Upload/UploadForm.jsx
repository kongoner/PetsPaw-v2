import { useState } from 'react';
import { uploadImage } from '../../api/upload';
import styles from './uploadPopup.module.scss';
import UploadPreview from './UploadPreview';
import UploadMessage from './UploadMessage';

export default function UploadForm() {
	const [file, setFile] = useState(null);
	const [isDragging, setIsDragging] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [uploadStatus, setUploadStatus] = useState(null); // 'success' | 'error' | null

	const handleDragOver = (e) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragging(false);
		const droppedFile = e.dataTransfer.files[0];
		if (droppedFile) setFile(droppedFile);
	};

	const handleUpload = async () => {
		if (!file) return;
		setIsLoading(true);
		setUploadStatus(null);
		try {
			await uploadImage(file);
			setUploadStatus('success');
			setFile(null);
			document.getElementById('input-file').value = '';
		} catch {
			setUploadStatus('error');
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (e) => {
		setFile(e.target.files[0]);
	};

	return (
		<>
			<div className={styles.uploadHeader}>
				<h2>Upload a .jpg or .png Cat Image</h2>
				<p className='subtitle'>
					Any uploads must comply with the{' '}
					<a href='https://thecatapi.com/privacy' className='link-text'>
						upload guidelines
					</a>{' '}
					or face deletion.
				</p>
			</div>
			<label
				htmlFor='input-file'
				className={`${styles.uploadArea} ${isDragging ? styles.active : ''}`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<input
					type='file'
					id='input-file'
					accept='.jpg,.jpeg,.png'
					hidden
					onChange={handleChange}
				/>
				{!file && (
					<p className='subtitle'>
						<b>Drag here</b> your file or <b>Click here</b> to upload
					</p>
				)}
				<UploadPreview file={file} />
			</label>
			<p className='subtitle'>{file ? file.name : 'No file selected'}</p>
			<button
				className={`${styles.btnUploadFile} ${!file ? styles.disabled : ''} ${isLoading ? styles.loading : ''}`}
				disabled={!file || isLoading}
				onClick={handleUpload}
			>
				<img src='images/loading-white-16.svg' alt='Loading' />
				UPLOAD PHOTO
			</button>
			{uploadStatus && <UploadMessage status={uploadStatus} />}
		</>
	);
}
