import styles from './page.module.scss';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

export default function DislikesPage() {
    return (
        <div className={styles.page}>
            <Breadcrumbs />
        </div>
    )
}