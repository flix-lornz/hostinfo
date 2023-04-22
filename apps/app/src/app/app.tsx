// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { maxHeaderSize } from 'http';
import styles from './app.module.scss';
import Category from './category/category';
import Sidebar from './sidebar/sidebar';
//          justifySelf: 'center',

export function App() {
  return (
    <div className={styles['shell']}>
      <h1
        style={{
          gridArea: 'heading',
          placeSelf: 'center',
          alignSelf: 'normal',
        }}
      >
        ETI Info-System
      </h1>

      <Sidebar
        style={{ gridArea: 'sidebar' }}
        className={styles['sidebar']}
      ></Sidebar>

      <Category
        style={{
          gridArea: 'category',
          width: '75vw',
          minWidth: 'auto',
          placeSelf: 'center',
        }}
      ></Category>
    </div>
  );
}

export default App;
