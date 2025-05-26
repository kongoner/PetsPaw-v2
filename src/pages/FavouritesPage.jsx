import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import GalleryFavouriteCard from '../components/ImageCards/GalleryFavouriteCard';
import Loader from '../components/Loader/Loader';
import UserLog from '../components/UserLog/UserLog';
import { getVotesByType } from '../api/logs';

export default function FavouritesPage() {
	const [images, setImages] = useState([]);
	const [logs, setLogs] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchFavourites = async () => {
			setIsLoading(true);
			try {
				const votes = await getVotesByType(2); // 2 = favourite
				if (!votes.length) return setImages([]);

				// Extract favourite image data
				const favouriteImages = votes.map(
					({ image_id, image, created_at }) => ({
						id: image_id,
						url: image?.url,
						created_at,
					}),
				);

				// Prepare logs for the last 5 actions
				const logsData = favouriteImages
					.slice(-5)
					.map(({ id, created_at }) => ({
						timestamp: created_at.slice(11, 16),
						imageId: id,
						actionType: 'favourite',
					}));

				setImages(favouriteImages);
				setLogs(logsData);
			} catch (err) {
				console.error('Failed to load favourite images or logs', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchFavourites();
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
					{/* Render favourite images in a grid */}
					<ImageGrid>
						{images.map(({ id, url }) => (
							<GalleryFavouriteCard key={id} imageId={id} imageUrl={url} />
						))}
					</ImageGrid>

					{/* Render logs for favourite actions */}
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
