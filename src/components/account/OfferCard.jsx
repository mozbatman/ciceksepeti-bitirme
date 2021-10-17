import Button from "../form/Button/Button";
import styles from "./OfferCard.module.scss";

const PRICE_TYPE = "TL";
const PRODUCT_IMAGE_ALT = "ürün görseli";

const OfferCard = ({ offerData, isGiven, rejectOffer, acceptOffer, setProductId, openBuyModal }) => {
    return (
        <div className={styles.offerCard}>
            <div className={styles.offerInfoContainer}>
                <div className={styles.image}>
                    <img src={offerData.product.imageUrl} alt={PRODUCT_IMAGE_ALT} />
                </div>
                <div className={styles.offerInfo}>
                    <div className={styles.title}>{offerData.product.title}</div>
                    <div className={styles.price}>
                        {" "}
                        {isGiven ? "Verilen Teklif:" : "Alınan Teklif"}{" "}
                        <div>
                            {offerData.offeredPrice} {PRICE_TYPE}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.buttonOrStatus}>
                {isGiven ? (
                    <>
                        {offerData.status === "offered" ? (
                            <div className={styles.waiting}>Donus Bekleniyor</div>
                        ) : (
                            <>
                            
                                {offerData.status === "accepted" ? (
                                    <>
                                    
                                        {!offerData.product.isSold && (
                                            <Button
                                                text="Satın Al"
                                                className="primary"
                                                type="button"
                                                onClick={() => {setProductId(offerData.product.id); openBuyModal()}}
                                            />
                                        )}
                                        <div className={styles.accepted}>Onaylandı</div>
                                    </>
                                ) : (
                                    <div className={styles.rejected}>Reddedildi</div>
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {offerData.status === "offered" ? (
                            <>
                                <Button
                                    text="Onayla"
                                    className="primary"
                                    type="button"
                                    onClick={() => {
                                        acceptOffer(offerData.id);
                                    }}
                                />
                                <Button
                                    text="Reddet"
                                    className="primary"
                                    type="button"
                                    onClick={() => {
                                        rejectOffer(offerData.id);
                                    }}
                                />
                            </>
                        ) : offerData.status === "accepted" ? (
                            <div className={styles.accepted}>Onaylandı</div>
                        ) : (
                            <div className={styles.rejected}>Reddedildi</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default OfferCard;
