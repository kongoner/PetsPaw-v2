import { useState } from 'react';
import styles from './orderRadioButton.module.scss';

export default function OrderRadioButton({ onChange }) {
  const [selected, setSelected] = useState('ASC');

  const handleChange = (e) => {
    setSelected(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className={styles.orderWrapper} role="radiogroup" aria-label="Sort order">
      <label className={`${styles.order} ${selected === 'ASC' ? styles.active : ''}`}>
        <input
          type="radio"
          name="order"
          value="ASC"
          checked={selected === 'ASC'}
          onChange={handleChange}
          hidden
        />
        <img src="src/images/sort-revert-color-20.svg" alt="Sort Ascending" />
      </label>
      <label className={`${styles.order} ${selected === 'DESC' ? styles.active : ''}`}>
        <input
          type="radio"
          name="order"
          value="DESC"
          checked={selected === 'DESC'}
          onChange={handleChange}
          hidden
        />
        <img src="src/images/sort-color-20.svg" alt="Sort Descending" />
      </label>
    </div>
  );
}