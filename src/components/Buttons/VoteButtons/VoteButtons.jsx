import styles from './voteButtons.module.scss';

export default function VoteButtons({ onLike, onFavourite, onDislike }) {
    return (
        <div className={styles.voteButtonsContainer}>
            <button className={`${styles.voteButton} ${styles.like}`} onClick={onLike}>
                <img src="/images/like-white-30.svg" alt="Like" />
            </button>
            <button className={`${styles.voteButton} ${styles.favourite}`} onClick={onFavourite}>
                <img src="/images/fav-white-30.svg" alt="Favourite" />
            </button>
            <button className={`${styles.voteButton} ${styles.dislike}`} onClick={onDislike}>
                <img src="/images/dislike-white-30.svg" alt="Dislike" />
            </button>
        </div>
    );
}