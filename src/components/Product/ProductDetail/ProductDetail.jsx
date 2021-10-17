import Button from "../../form/Button/Button";
import styles from "./ProductDetail.module.scss";

const PRICE_TYPE = "TL";

const ProductDetail = ({ product, openBuyModal, openOfferModal, givenOffers, cancelOffer }) => {
    const checkMakeOffer = () => {
        if (givenOffers) {
            let offer = givenOffers.find((o) => o.product.id === product.id);
            return offer;
        }
        return false;
    };

    const offer = checkMakeOffer();

    return (
        <div className={styles.productDetail}>
            <div className={styles.image}>
                <img src={product.imageUrl} alt={product.title} />
            </div>
            <div className={styles.info}>
                <div className={styles.title}>{product.title}</div>
                <div className={styles.infoArea}>
                    <div className={styles.leftContent}>
                        <p className={styles.infoAreaItem}>Marka:</p>
                        <p className={styles.infoAreaItem}>Renk:</p>
                        <p className={styles.infoAreaItem}>Kullanım Durumu:</p>
                    </div>
                    <div className={styles.rightContent}>
                        <p className={styles.infoAreaItem}>{product.brand.title}</p>
                        <p className={styles.infoAreaItem}>{product.color.title}</p>
                        <p className={styles.infoAreaItem}>{product.status.title}</p>
                    </div>
                </div>
                <div className={styles.price}>
                    {product.price} {PRICE_TYPE}
                </div>
                {
                   (offer && !product.isSold) && <div className={styles.offerGiven}> <p> Verilen Teklif: </p>  {offer.offeredPrice} {PRICE_TYPE}</div>
                }
                {!product.isSold ? (
                    <div className={styles.buttonGroup}>
                        <Button text="Satın Al" className="primary" type="button" onClick={() => openBuyModal()} />
                        {!offer ? (
                            <Button
                                text="Teklif Ver"
                                className="secondary"
                                type="button"
                                onClick={() => openOfferModal()}
                            />
                        ) : (
                            <Button
                                text="Teklifi Geri Çek"
                                className="secondary"
                                type="button"
                                onClick={() => cancelOffer(offer.id)}
                            />
                        )}
                    </div>
                ) : (
                    <div className={styles.notSale}>Bu Ürün Satışta Değil</div>
                )}

                <div className={styles.descTitle}>Açıklama</div>
                <div className={styles.desc}>{product.description}</div>
            </div>
        </div>
    );
};

export default ProductDetail;
