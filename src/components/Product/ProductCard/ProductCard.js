import { useHistory } from "react-router";
import styles from "./ProductCard.module.scss";

const PRICE_TYPE = "TL";

const ProductCard = ({ product }) => {
  const history = useHistory();

    const pushProduct = () => {
      history.push('/product/' + product.id);
    }

    return (
        <div className={styles.card} onClick={pushProduct}>
            <div className={styles.image}>
                <img src={product.imageUrl} alt={product.title}/>
            </div>
            <div className={styles.info}>
                <div className={styles.category}>{product.category.title}</div>
                <div className={styles.color}>Renk: {product.color.title}</div>
            </div>
            <div className={styles.price}>
                {product.price} {PRICE_TYPE}
            </div>
        </div>
    );
};

export default ProductCard;
