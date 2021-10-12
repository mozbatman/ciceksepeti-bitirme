import styles from './OfferCard.module.scss';

const OfferCard = ({ offerData }) => {
  return <div className={styles.offerCard}>
    <div className={styles.offerInfo}>
      <div className={styles.image}>
        <img />
      </div>
      <div>
        <div>title</div>
        <div>offer</div>
      </div>
    </div>
    <div className={styles.buttonOrStatus}>

    </div>
  </div>
}

export default OfferCard;