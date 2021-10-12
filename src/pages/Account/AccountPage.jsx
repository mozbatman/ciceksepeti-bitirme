import styles from "./AccountPage.module.scss";
import accountImage from "../../assets/images/account2x.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGivenOffers, getReceivedOffers } from "../../actions/AccountActions";
import OfferCard from "../../components/account/OfferCard";

const ACCOUNT_IMAGE_ALT = "account icon";
const OFFER_RECEIVER = "offer-receiver";
const OFFER_GIVEN = "offer-given";

const AccountPage = () => {
    const dispatch = useDispatch();
    const [offerStatus, setOfferStatus] = useState(OFFER_RECEIVER);
    const givenOffers = useSelector((state) => state.account.givenOffers);
    const receivedOffers = useSelector((state) => state.account.receivedOffers);

    useEffect(() => {
        if (offerStatus === OFFER_RECEIVER) {
            dispatch(getReceivedOffers());
        } else {
            dispatch(getGivenOffers());
        }
    }, [offerStatus]);

    const getMenuClass = (name) => {
        let className = [styles.menuItem];

        if (offerStatus === name) {
            className.push(styles.activeMenu);
        }

        return className.join(" ");
    };

    return (
        <section className={styles.accountPage}>
            <div className={styles.emailSection}>
                <img src={accountImage} alt={ACCOUNT_IMAGE_ALT} />
                <div>mustafaozbatman6@gmail.com</div>
            </div>
            <div className={styles.offerSection}>
                <div className={styles.offerMenu}>
                    <div className={getMenuClass(OFFER_RECEIVER)} onClick={() => setOfferStatus(OFFER_RECEIVER)}>
                        Teklif Aldıklarım
                    </div>
                    <div className={getMenuClass(OFFER_GIVEN)} onClick={() => setOfferStatus(OFFER_GIVEN)}>
                        Teklif Verdiklerim
                    </div>
                </div>
                <div className={styles.offerContent}>
                    {offerStatus === OFFER_RECEIVER ? (
                        <div>
                            {receivedOffers && receivedOffers.map((item) => {
                                return <OfferCard offerData={item} />;
                            })}
                        </div>
                    ) : (
                        <div>
                            {receivedOffers && givenOffers.map((item) => {
                                return <OfferCard offerData={item} />;
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AccountPage;
