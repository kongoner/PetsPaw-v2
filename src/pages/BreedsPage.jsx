import styles from './page.module.scss';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Dropdown from '../components/Dropdown/Dropdown';
import OrderRadioButton from '../components/OrderRadioButton/OrderRadioButton';

export default function BreedsPage() {
    return (
        <div className={styles.page}>
            <div className={styles.breedPageToolbar}>
                <Breadcrumbs />
                <div className={styles.breedPageFilters}>
                    <Dropdown
                        id='breeds-selector'
                        alt='Breeds selector'
                        onChange={(e) => console.log(e.target.value)}
                    >
                        <option value="all" selected>All breeds</option>
                    </Dropdown>
                    <Dropdown
                        id='limit-selector'
                        alt='Limit selector'
                        onChange={(e) => console.log(e.target.value)}
                    >
                        <option value="5" selected>Limit: 5</option>
                        <option value="10">Limit: 10</option>
                        <option value="15">Limit: 15</option>
                        <option value="20">Limit: 20</option>
                    </Dropdown>
                    <OrderRadioButton />
                </div>
            </div>
        </div>
    )
}