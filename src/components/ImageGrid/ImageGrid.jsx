import styles from './imageGrid.module.scss';

export default function ImageGrid({ children }) {
	return <div className={styles.imageGrid}>{children}</div>;
}
