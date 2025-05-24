import styles from './themeToggle.module.scss';
import useThemeControl from '../../hooks/useThemeControl';

export default function ThemeToggle() {
  const [isDarkMode, toggleTheme] = useThemeControl();

  return (
      <div className={styles.themeToggle}>
            <input 
              type="checkbox"
              id="theme-switch"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <label htmlFor="theme-switch" className={styles.toggleLabel}>
              <img className={`${styles.icon} ${styles.eyeOpen}`} src="/images/eye-opened.svg" />
              <img className={`${styles.icon} ${styles.eyeClosed}`} src="/images/eye-closed.svg"/>
              <span className={styles.toggleThumb}></span>
            </label>
          </div>
  )
}