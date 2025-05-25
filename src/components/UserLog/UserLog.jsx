import styles from './userLog.module.scss';

export default function UserLog({ timestamp, imageId, actionType }) {
	let actionText = '';
	let iconSrc = '';

	switch (actionType) {
		case 'like':
			actionText = 'was added to Likes';
			iconSrc = `${import.meta.env.BASE_URL}images/like-color-20.svg`;
			break;
		case 'favourite':
			actionText = 'was added to Favourites';
			iconSrc = `${import.meta.env.BASE_URL}images/fav-20.svg`;
			break;
		case 'dislike':
			actionText = 'was added to Dislikes';
			iconSrc = `${import.meta.env.BASE_URL}images/dislike-color-20.svg`;
			break;
		default:
			break;
	}

	return (
		<div className={styles.userAction}>
			<span className={styles.timestamp}>{timestamp}</span>
			<p className={styles.action}>
				Image ID: <span className={styles.idHighlighted}>{imageId}</span>{' '}
				{actionText}
			</p>
			{iconSrc && (
				<img className={styles.actionIcon} src={iconSrc} alt={actionType} />
			)}
		</div>
	);
}
