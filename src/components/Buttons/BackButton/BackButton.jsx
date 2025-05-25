import { useNavigate } from 'react-router-dom';
import styles from './backButton.module.scss';

export default function BackButton() {
	const navigate = useNavigate();
	return (
		<button className={styles.backButton} onClick={() => navigate(-1)}>
			<img src='/images/back-20.svg' alt='Back' />
		</button>
	);
}
