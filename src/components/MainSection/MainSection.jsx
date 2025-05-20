import ThemeToggle from '../Checkbox/ThemeToggle';
import styles from './MainSection.module.scss';

export default function MainSection() {
  return (
    <div className={styles.mainSection}>
      <div className={styles.mainHeader}>
        <a href="/" className={styles.logo} data-link>
          <img id="logo" src="src/images/logo.svg" alt="PetsPaw Logo" />
        </a>
        <ThemeToggle />
      </div>

      <div className={styles.greeting}>
        <h1>Meow!</h1>
        <p className="subtitle">Welcome to PetsPaw✌️</p>
      </div>

      <nav className={styles.navigation}>
        <a href="voting" className={`${styles.navCard} ${styles.voting}`} data-link>
          <img
            src="src/images/vote-table@1x.webp"
            srcSet="src/images/vote-table@2x.webp 2x"
            alt="Voting"
          />
          <span className={styles.label}>VOTING</span>
        </a>

        <a href="breeds" className={`${styles.navCard} ${styles.breeds}`} data-link>
          <img
            src="src/images/pet-breeds@1x.webp"
            srcSet="src/images/pet-breeds@2x.webp 2x"
            alt="Breeds"
          />
          <span className={styles.label}>BREEDS</span>
        </a>

        <a href="gallery" className={`${styles.navCard} ${styles.gallery}`} data-link>
          <img
            src="src/images/images-search@1x.webp"
            srcSet="src/images/images-search@2x.webp 2x"
            alt="Gallery"
          />
          <span className={styles.label}>GALLERY</span>
        </a>
      </nav>
    </div>
  );
}