import { CSSProperties } from 'react';
import styles from './category.module.scss';

/* eslint-disable-next-line */
export interface CategoryProps {
  style?: CSSProperties; // ? - optional
}

export function Category({ style }: CategoryProps) {
  return (
    <div style={style} className={styles['container']}>
      <h2>Kategorie</h2>

      <ul className={styles['buttons']}>
        <li>
          <button>Office</button>
        </li>
        <li>
          <button>Room</button>
        </li>
        <li>
          <button>Person</button>
        </li>
      </ul>
    </div>
  );
}

export default Category;
