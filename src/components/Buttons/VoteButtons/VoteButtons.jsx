import styles from './voteButtons.module.scss';

export default function VoteButtons({ onLike, onFavourite, onDislike }) {
	return (
		<div className={styles.voteButtonsContainer}>
			<button
				className={`${styles.voteButton} ${styles.like}`}
				onClick={onLike}
			>
				<img
					src={`${import.meta.env.BASE_URL}images/like-white-30.svg`}
					alt='Like'
				/>
			</button>
			<button
				className={`${styles.voteButton} ${styles.favourite}`}
				onClick={onFavourite}
			>
				<img
					src={`${import.meta.env.BASE_URL}images/fav-white-30.svg`}
					alt='Favourite'
				/>
			</button>
			<button
				className={`${styles.voteButton} ${styles.dislike}`}
				onClick={onDislike}
			>
				<img
					src={`${import.meta.env.BASE_URL}images/dislike-white-30.svg`}
					alt='Dislike'
				/>
			</button>
		</div>
	);
}
