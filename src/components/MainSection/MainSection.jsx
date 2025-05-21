import ThemeToggle from '../Checkbox/ThemeToggle';
import NavigationCard from '../NavigationCard/NavigationCard';
import styles from './mainSection.module.scss';
import { Link } from 'react-router-dom';

export default function MainSection() {
  return (
    <div className={styles.mainSection}>
      <div className={styles.mainHeader}>
        <Link to='/' className={styles.logo} data-link>
          <img id="logo" src="src/images/logo.svg" alt="PetsPaw Logo" />
        </Link>
        <ThemeToggle />
      </div>

      <div className={styles.greeting}>
        <h1>Meow!</h1>
        <p className="subtitle">Welcome to PetsPaw✌️</p>
      </div>

      <nav className={styles.navigation}>
        <NavigationCard
            toPath='/voting'
            name="Voting"
            imageUrl="src/images/vote-table"
            className={styles.voting}
        />
        <NavigationCard
            toPath='/breeds'
            name="Breeds"
            imageUrl="src/images/pet-breeds"
            className={styles.breeds}
        />
        <NavigationCard
            toPath='/gallery'
            name="Gallery"
            imageUrl="src/images/images-search"
            className={styles.gallery}
        />
      </nav>
    </div>
  );
}