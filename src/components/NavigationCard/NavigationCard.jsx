import { NavLink } from 'react-router-dom';
import styles from './navigationCard.module.scss';

export default function NavigationCard({ toPath, name, imageUrl, className = '' }) {
  return (
    <NavLink
      to={toPath}
      className={({ isActive }) =>
        `${styles.navCard} ${className} ${isActive ? styles.active : ''}`
      }
      data-link
    >
      <img
        src={`${imageUrl}@1x.webp`}
        srcSet={`${imageUrl}@2x.webp 2x`}
        alt={name}
      />
      <span className={styles.label}>{name}</span>
    </NavLink>
  );
}