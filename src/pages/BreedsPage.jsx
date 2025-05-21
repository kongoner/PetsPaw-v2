import styles from './page.module.scss';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

export default function BreedsPage() {
    return (
        <div className={styles.page}>
            <Breadcrumbs />
        </div>
    )
}