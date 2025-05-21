import styles from './page.module.scss';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

export default function LikesPage() {
    return (
        <div className={styles.page}>
            <Breadcrumbs />
        </div>
    )
}