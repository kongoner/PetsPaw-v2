import styles from './imageCard.module.scss';

export default function BasicCard({ imageUrl }) {
  return (
    <div
      className={styles.basicCard}
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
  );
}