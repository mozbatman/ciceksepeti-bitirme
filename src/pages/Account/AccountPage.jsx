import styles from "./AccountPage.module.scss";
import accountImage from "../../assets/images/account2x.png";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getGivenOffers, getReceivedOffers, rejectOffer, acceptOffer } from "../../actions/AccountActions";
import { purchaseProduct } from "../../actions/ProductActions";
import { toastSuccess, toastError } from "../../components/shared/toast";
import OfferCard from "../../components/account/OfferCard";
import Loader from "../../components/shared/Loader/Loader";
import BuyModal from "../../components/Product/BuyModal/BuyModal";

const ACCOUNT_IMAGE_ALT = "account icon";
const OFFER_RECEIVER = "offer-receiver";
const OFFER_GIVEN = "offer-given";

const AccountPage = () => {
    const dispatch = useDispatch();
    const [offerStatus, setOfferStatus] = useState(OFFER_RECEIVER);
    const [openBuyModal, setOpenBuyModal] = useState(false);
    const [cookies, setCookie] = useCookies(["email"]);
    const [productId, setProductId] = useState(0);
    const givenOffers = useSelector((state) => state.account.givenOffers);
    const gettingGivenOffers = useSelector((state) => state.account.getGivenOffers);
    const receivedOffers = useSelector((state) => state.account.receivedOffers);
    const gettingReceivedOffers = useSelector((state) => state.account.getReceivedOffers);

    useEffect(() => {
        if (offerStatus === OFFER_RECEIVER) {
            dispatch(getReceivedOffers());
        } else {
            dispatch(getGivenOffers());
        }
    }, [offerStatus]);

    const _openBuyModal = () => setOpenBuyModal(true);
    const _closeBuyModal = () => {setOpenBuyModal(false); setProductId(0)};

    const getMenuClass = (name) => {
        let className = [styles.menuItem];

        if (offerStatus === name) {
            className.push(styles.activeMenu);
        }

        return className.join(" ");
    };

    const _rejectOffer = (id) => {
        dispatch(rejectOffer(id)).then((res) => {
            if (!res.error) {
                toastSuccess("Reddedildi.");
            } else {
                toastError("Bir hata oluştu!");
            }
            dispatch(getReceivedOffers());
        });
    };

    const _acceptOffer = (id) => {
        dispatch(acceptOffer(id)).then((res) => {
            if (!res.error) {
                toastSuccess("Kabul edildi.");
            } else {
                toastError("Bir hata oluştu!");
            }
            dispatch(getReceivedOffers());
        });
    };

    const _purchaseProduct = () => {
        _closeBuyModal();
        dispatch(purchaseProduct(productId)).then((res) => {
            if (!res.error) {
                toastSuccess("Satın Alındı");
            } else {
                toastError("Bir hata oluştu!");
            }
            dispatch(getGivenOffers());
        });
    };

    return (
        <section className={styles.accountPage}>
            <div className={styles.emailSection}>
                <img src={accountImage} alt={ACCOUNT_IMAGE_ALT} />
                <div>{cookies['email']}</div>
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
                            {receivedOffers?.length > 0 ? (
                                receivedOffers.map((item) => {
                                    return (
                                        <OfferCard
                                            key={item.id}
                                            offerData={item}
                                            isGiven={false}
                                            rejectOffer={_rejectOffer}
                                            acceptOffer={_acceptOffer}
                                        />
                                    );
                                })
                            ) : (
                                <div className={styles.noOffer}>Alınan Teklifiniz Bulunmamaktadır..!</div>
                            )}
                        </div>
                    ) : (
                        <div>
                            {givenOffers?.length > 0 ? (
                                givenOffers.map((item) => {
                                    return (
                                        <OfferCard
                                            key={item.id}
                                            offerData={item}
                                            isGiven={true}
                                            openBuyModal={_openBuyModal}
                                            setProductId={setProductId}
                                        />
                                    );
                                })
                            ) : (
                                <div className={styles.noOffer}>Verilen Teklifiniz Bulunmamaktadır..!</div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {(gettingGivenOffers || gettingReceivedOffers) && <Loader />}

            {openBuyModal && <BuyModal open={openBuyModal} closeModal={_closeBuyModal} buyProduct={_purchaseProduct} />}
        </section>
    );
};

export default AccountPage;
