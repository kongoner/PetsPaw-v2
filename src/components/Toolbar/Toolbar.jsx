import styles from './toolbar.module.scss';
import LinkButton from '../LinkButton/LinkButton';
import SearchBar from '../SearchBar/SearchBar';

export default function Toolbar() {
	return (
		<div className={styles.toolbar}>
			<LinkButton
				toPath='/'
				className={styles.linkHome}
				imageUrl={`${import.meta.env.BASE_URL}images/icon-home-30.svg`}
			/>
			<SearchBar />
			<div className={styles.linksToolbar}>
				<LinkButton
					toPath='/likes'
					imageUrl={`${import.meta.env.BASE_URL}images/like-30.svg`}
					alt='Likes'
				/>
				<LinkButton
					toPath='/favourites'
					imageUrl={`${import.meta.env.BASE_URL}images/fav-30.svg`}
					alt='Favorites'
				/>
				<LinkButton
					toPath='/dislikes'
					imageUrl={`${import.meta.env.BASE_URL}images/dislike-30.svg`}
					alt='Dislikes'
				/>
			</div>
		</div>
	);
}
