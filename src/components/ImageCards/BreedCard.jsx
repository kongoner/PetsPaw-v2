import styles from './imageCard.module.scss';

export default function BreedCard({ imageUrl, breedName, onClick }) {
  return (
    <div
      className={styles.breedCard}
      style={{ backgroundImage: `url(${imageUrl})` }}
      onClick={onClick}
    >
      <div className={styles.breedLabel}>{breedName}</div>
    </div>
  );
}