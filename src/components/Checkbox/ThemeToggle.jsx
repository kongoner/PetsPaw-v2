import styles from './ThemeToggle.module.scss';

export default function ThemeToggle() {
    return (
        <div className={styles.themeToggle}>
              <input type="checkbox" id="theme-switch" />
              <label htmlFor="theme-switch" className={styles.toggleLabel}>
                <img className={`${styles.icon} ${styles.eyeOpen}`} src="src/images/eye-opened.svg" />
                <img className={`${styles.icon} ${styles.eyeClosed}`} src="src/images/eye-closed.svg"/>
                <span className={styles.toggleThumb}></span>
              </label>
            </div>
    )
}