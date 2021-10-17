import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useCookies } from "react-cookie";
import Modal from "react-bootstrap/Modal";
import ProductDetail from "../../components/Product/ProductDetail/ProductDetail";
import Button from "../../components/form/Button/Button";
import { getProduct, purchaseProduct, offerProduct } from "../../actions/ProductActions";
import { getGivenOffers, cancelOffer } from "../../actions/AccountActions";
import Input from "../../components/form/Input/Input";
import styles from "./ProductDetailPage.module.scss";
import Loader from "../../components/shared/Loader/Loader";
import BuyModal from "../../components/Product/BuyModal/BuyModal";
import { toastError, toastSuccess } from "../../components/shared/toast";

const MODAL_IMAGE_ALT = "ürün görseli";
const PRICE_TYPE = "TL";

const ProductDetailPage = () => {
    const params = useParams();
    const dispatch = useDispatch();

    const [product, setProduct] = useState();
    const [cookies, setCookie] = useCookies(["authToken"]);
    const gettingProduct = useSelector((state) => state.product.getProduct);
    const givenOffers = useSelector((state) => state.account.givenOffers);
    const [openOfferModal, setOpenOfferModal] = useState(false);
    const [openBuyModal, setOpenBuyModal] = useState(false);

    useEffect(() => {
        dispatch(getProduct(params.id)).then((res) => {
            setProduct(res.payload.data);
        });

        if (typeof cookies["authToken"] !== "undefined") {
            dispatch(getGivenOffers());
        }

    }, []);

    const _openOfferModal = () => setOpenOfferModal(true);
    const _closeOfferModal = () => setOpenOfferModal(false);

    const _openBuyModal = () => setOpenBuyModal(true);
    const _closeBuyModal = () => setOpenBuyModal(false);

    const buyProduct = () => {
        dispatch(purchaseProduct(product.id)).then((res) => {
            if (!res.error) {
                toastSuccess("Satın Alındı.");
                dispatch(getProduct(params.id)).then((res) => {
                    setProduct(res.payload.data);
                });

            } else {
                toastError("Bir hata oluştu!");
            }
            _closeBuyModal();
        });
    };

    const giveOfferProduct = (offerPrice) => {
        let payload = {
            offeredPrice: offerPrice,
        };

        dispatch(offerProduct(product.id, payload)).then((res) => {
            if (!res.error) {
                toastSuccess("Teklif Yapıldı.");
                dispatch(getProduct(params.id)).then((res) => {
                    setProduct(res.payload.data);
                });
                dispatch(getGivenOffers());
            } else {
                toastError("Bir hata oluştu!");
            }
            _closeOfferModal();
        });
    };

    const _cancelOffer = (offerId) => {
        dispatch(cancelOffer(offerId)).then((res) => {
            if (!res.error) {
                toastSuccess("Teklif çekildi.");
                dispatch(getProduct(params.id)).then((res) => {
                    setProduct(res.payload.data);
                });
                dispatch(getGivenOffers());
            } else {
                toastError("Bir hata oluştu!");
            }
        });
    };

    return (
        <div className={styles.productDetail}>
            {product && (
                <ProductDetail
                    product={product}
                    openBuyModal={_openBuyModal}
                    cancelOffer={_cancelOffer}
                    givenOffers={givenOffers}
                    openOfferModal={_openOfferModal}
                />
            )}
            {openOfferModal && (
                <GiveOfferModal
                    open={openOfferModal}
                    closeModal={_closeOfferModal}
                    product={product}
                    giveOffer={giveOfferProduct}
                />
            )}
            {openBuyModal && <BuyModal open={openBuyModal} closeModal={_closeBuyModal} buyProduct={buyProduct} />}

            {gettingProduct && <Loader />}
        </div>
    );
};

const GiveOfferModal = ({ open, closeModal, giveOffer, product }) => {
    const offers = [20, 30, 40];

    const [checkRadio, setCheckRadio] = useState(20);
    const [customOfferPrice, setCustomOfferPrice] = useState();

    const getClassRadio = (id) => {
        const classes = [styles.radioArea];

        if (id === checkRadio) {
            classes.push(styles.checkedRadio);
        }

        return classes.join(" ");
    };

    const checkRadioItem = (e, id) => {
        if (e.target.checked) {
            setCheckRadio(id);
        } else {
            setCheckRadio(0);
        }
    };

    const _giveOffer = () => {
        let price = 0;
        if (parseInt(customOfferPrice) > 0) {
            price = parseInt(customOfferPrice);
        } else {
            price = (parseInt(product.price) * parseInt(checkRadio)) / 100;
        }

        giveOffer(price);
    };

    return (
        <Modal show={open} onHide={closeModal} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>Teklif Ver</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>
                    <div className={styles.productInfo}>
                        <div className={styles.info}>
                            <img src={product.imageUrl} alt={MODAL_IMAGE_ALT} />
                            <div>{product.title}</div>
                        </div>
                        <div className={styles.price}>
                            {product.price} {PRICE_TYPE}
                        </div>
                    </div>
                    <div className={styles.offers}>
                        {offers.map((item) => {
                            return (
                                <div className={getClassRadio(item)}>
                                    <input
                                        id={item}
                                        name="offer-select"
                                        type="checkbox"
                                        className={styles.inputRadio}
                                        checked={checkRadio === item}
                                        onChange={(e) => checkRadioItem(e, item)}
                                    />
                                    <label>%{item}'si Kadar Teklif Ver</label>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.customOffer}>
                        <Input.Input
                            id="offer"
                            name="offer"
                            type="number"
                            placeholder="Teklif Belirle"
                            value={customOfferPrice}
                            suffix={<div>{PRICE_TYPE}</div>}
                            onChangeInput={setCustomOfferPrice}
                        />
                    </div>
                </>
            </Modal.Body>
            <Modal.Footer>
                <Button text="Teklif Ver" className="primary" type="button" onClick={_giveOffer} />
            </Modal.Footer>
        </Modal>
    );
};

export default ProductDetailPage;
