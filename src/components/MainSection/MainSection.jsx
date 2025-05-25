import ThemeToggle from '../Toggles/ThemeToggle';
import NavigationCard from '../NavigationCard/NavigationCard';
import styles from './mainSection.module.scss';
import { Link } from 'react-router-dom';

export default function MainSection() {
	return (
		<div className={styles.mainSection}>
			<div className={styles.mainHeader}>
				<Link to='/' className={styles.logo} data-link>
					<img
						id='logo'
						src={`${import.meta.env.BASE_URL}images/logo.svg`}
						alt='PetsPaw Logo'
					/>
				</Link>
				<ThemeToggle />
			</div>

			<div className={styles.greeting}>
				<h1>Meow!</h1>
				<p className='subtitle'>Welcome to PetsPaw✌️</p>
			</div>

			<nav className={styles.navigation}>
				<NavigationCard
					toPath='/voting'
					name='Voting'
					imageUrl={`${import.meta.env.BASE_URL}images/vote-table`}
					className={styles.voting}
				/>
				<NavigationCard
					toPath='/breeds'
					name='Breeds'
					imageUrl={`${import.meta.env.BASE_URL}images/pet-breeds`}
					className={styles.breeds}
				/>
				<NavigationCard
					toPath='/gallery'
					name='Gallery'
					imageUrl={`${import.meta.env.BASE_URL}images/images-search`}
					className={styles.gallery}
				/>
			</nav>
		</div>
	);
}
