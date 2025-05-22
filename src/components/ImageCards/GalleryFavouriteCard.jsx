import styles from './imageCard.module.scss';

export default function FavouriteCard({ imageUrl, isFavourite, onToggle }) {
  return (
    <div
      className={styles.galleryFavouritesCard}
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <button
        className={`${styles.favToggle} ${isFavourite ? styles.active : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        <img
          src={
            isFavourite
              ? '/src/images/icon-heart-filled.svg'
              : '/src/images/icon-heart-outline.svg'
          }
          alt="Toggle favourite"
        />
      </button>
    </div>
  );
}