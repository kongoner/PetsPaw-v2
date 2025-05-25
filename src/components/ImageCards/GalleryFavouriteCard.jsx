import { useEffect, useState } from 'react';
import styles from './imageCard.module.scss';
import { getUserVotes } from '../../api/logs';
import {
	addFavouriteVote,
	removeFavouriteVote,
} from '../../api/favouritesVotes';

export default function GalleryFavouriteCard({ imageId, imageUrl }) {
	const [isFavourite, setIsFavourite] = useState(false);
	const [isToggling, setIsToggling] = useState(false);

	useEffect(() => {
		const checkIfFavourite = async () => {
			try {
				const votes = await getUserVotes();
				const isFav = votes.data.some(
					(v) => v.image_id === imageId && v.value === 2,
				);
				setIsFavourite(isFav);
			} catch (err) {
				console.error('Failed to check favourite status', err);
			}
		};

		checkIfFavourite();
	}, [imageId]);

	const handleToggle = async (e) => {
		e.stopPropagation();
		setIsToggling(true);
		try {
			if (isFavourite) {
				await removeFavouriteVote(imageId);
				setIsFavourite(false);
			} else {
				await addFavouriteVote(imageId);
				setIsFavourite(true);
			}
		} catch (err) {
			console.error('Failed to toggle favourite', err);
		} finally {
			setIsToggling(false);
		}
	};

	return (
		<div
			className={styles.galleryFavouritesCard}
			style={{ backgroundImage: `url(${imageUrl})` }}
		>
			<button
				className={`${styles.favToggle} ${isFavourite ? styles.active : ''}`}
				onClick={handleToggle}
			>
				{isToggling ? (
					<img
						className={styles.loader}
						src='/images/loader-20.svg'
						alt='Loading'
					/>
				) : (
					<img
						src={
							isFavourite ? '/images/fav-color-20.svg' : '/images/fav-20.svg'
						}
						alt='Toggle favourite'
					/>
				)}
			</button>
		</div>
	);
}
