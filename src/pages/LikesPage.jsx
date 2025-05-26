import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import BasicCard from '../components/ImageCards/BasicCard';
import Loader from '../components/Loader/Loader';
import UserLog from '../components/UserLog/UserLog';
import { getVotesByType } from '../api/logs';

export default function LikesPage() {
	const [images, setImages] = useState([]);
	const [logs, setLogs] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchLikes = async () => {
			setIsLoading(true);
			try {
				const votes = await getVotesByType(1); // 1 = like
				if (!votes.length) return setImages([]);

				// Extract unique image data and format logs
				const likedImages = votes.map(({ image_id, image, created_at }) => ({
					id: image_id,
					url: image?.url,
					created_at,
				}));

				const logsData = likedImages.slice(-5).map(({ id, created_at }) => ({
					timestamp: created_at.slice(11, 16),
					imageId: id,
					actionType: 'like',
				}));

				setImages(likedImages);
				setLogs(logsData);
			} catch (err) {
				console.error('Failed to load liked images or logs', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchLikes();
	}, []);

	return (
		<div className={styles.page}>
			<Breadcrumbs />
			{isLoading ? (
				<Loader />
			) : images.length === 0 ? (
				<p className={styles.nothingFound}>No item found</p>
			) : (
				<>
					{/* Render liked images in a grid */}
					<ImageGrid>
						{images.map(({ id, url }) => (
							<BasicCard key={id} imageUrl={url} />
						))}
					</ImageGrid>

					{/* Render logs for user actions */}
					<div className={styles.userActionLogs}>
						{logs.map(({ timestamp, imageId, actionType }) => (
							<UserLog
								key={`${imageId}-${timestamp}`}
								timestamp={timestamp}
								imageId={imageId}
								actionType={actionType}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}
