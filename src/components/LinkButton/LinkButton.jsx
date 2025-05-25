import { NavLink } from 'react-router-dom';
import styles from './linkButton.module.scss';

export default function LinkButton({
	toPath,
	imageUrl,
	alt = '',
	className = '',
}) {
	return (
		<NavLink
			to={toPath}
			className={({ isActive }) =>
				`${styles.linkButton} ${className} ${isActive ? styles.active : ''}`
			}
			data-link
		>
			<img src={imageUrl} alt={alt} />
		</NavLink>
	);
}
