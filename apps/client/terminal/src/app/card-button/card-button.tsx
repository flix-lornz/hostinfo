import styles from './card-button.module.scss';

/* eslint-disable-next-line */
export interface CardButtonProps {}

export function CardButton(props: CardButtonProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to CardButton!</h1>
    </div>
  );
}

export default CardButton;
