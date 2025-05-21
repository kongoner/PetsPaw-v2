import styles from './themeToggle.module.scss';
import useTheme from '../../hooks/useTheme';

export default function ThemeToggle() {
  const [isDarkMode, toggleTheme] = useTheme();

  return (
      <div className={styles.themeToggle}>
            <input 
              type="checkbox"
              id="theme-switch"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <label htmlFor="theme-switch" className={styles.toggleLabel}>
              <img className={`${styles.icon} ${styles.eyeOpen}`} src="src/images/eye-opened.svg" />
              <img className={`${styles.icon} ${styles.eyeClosed}`} src="src/images/eye-closed.svg"/>
              <span className={styles.toggleThumb}></span>
            </label>
          </div>
  )
}