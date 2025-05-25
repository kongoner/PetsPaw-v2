import { useLocation } from 'react-router-dom';
import styles from './breadcrumbs.module.scss';
import BackButton from '../Buttons/BackButton/BackButton';

export default function Breadcrumbs() {
	const location = useLocation();
	const pathParts = location.pathname.split('/').filter(Boolean);

	const getBreadcrumbItems = () => {
		if (pathParts.length === 1) {
			return [
				{
					label: pathParts[0].toUpperCase(),
					isActive: true,
				},
			];
		} else if (pathParts.length === 2) {
			// /breeds/abys or /search/abys
			return [
				{
					label: pathParts[0].toUpperCase(),
					isActive: false,
				},
				{
					label: pathParts[1].toUpperCase(),
					isActive: true,
				},
			];
		} else {
			return [];
		}
	};

	const breadcrumbs = getBreadcrumbItems();

	return (
		<div className={styles.breadcrumbs}>
			<BackButton />
			{breadcrumbs.map((crumb, index) => (
				<span
					key={index}
					className={`${styles.breadcrumbsItem} ${crumb.isActive ? styles.active : ''}`}
				>
					{crumb.label}
				</span>
			))}
		</div>
	);
}
