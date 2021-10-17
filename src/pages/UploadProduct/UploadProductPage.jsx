import { Formik } from "formik";
import { useDropzone } from "react-dropzone";
import Input from "../../components/form/Input/Input";
import Button from "../../components/form/Button/Button";
import upload_image from "../../assets/images/upload2x.png";
import styles from "./UploadProductPage.module.scss";
import { FaTimesCircle } from "react-icons/fa";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, getAllBrand, getAllColor, getAllStatus, uploadImage } from "../../actions/ProductActions";
import Schemas from "../../schemas";
import { useEffect } from "react";
import { getAllCategory } from "../../actions/CategoryActions";
import { toastSuccess, toastError } from "../../components/shared/toast";
import Loader from "../../components/shared/Loader/Loader";

const PRICE_TYPE = "TL";

const UploadProductPage = () => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
    const categories = useSelector((state) => state.category.categories);
    const gettingCategories = useSelector((state) => state.category.getCategories);
    const [myFiles, setMyFiles] = useState([]);
    const [uploadedFileUrl, setUploadedFileUrl] = useState();
    let _setFieldValue;

    useEffect(() => {
        dispatch(getAllBrand());
        dispatch(getAllColor());
        dispatch(getAllStatus());
        dispatch(getAllCategory());
    }, []);

    const onDrop = useCallback(
        (acceptedFiles) => {
            let data = new FormData();
            data.append("file", acceptedFiles[0]);
            dispatch(uploadImage(data)).then((res) => {
                _setFieldValue("imageUrl", res.payload.data.url);
            });
            setMyFiles([...myFiles, ...acceptedFiles]);
        },
        [myFiles]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/jpeg, image/jpg, image/png",
        maxFiles: 1,
        maxSize: 409600,
    });

    const removeImage = () => {
        _setFieldValue("imageUrl", '');
        setMyFiles([]);
    };

    const _createProduct = (e) => {
        let payload = {
            ...e,
            category: categories.find(c => c.id === e.category),
            brand: product.brands.find(b => b.id === e.brand),
            color: product.colors.find(b => b.id === e.color),
            status: product.statuses.find(b => b.id === e.status),
        }

        dispatch(createProduct(payload))
            .then((res) => {
                if (!res.error) {
                    toastSuccess("Ürün başarıyla yüklendi");
                }
                else {
                    toastError("Ürün yüklenirken bir hata oluştu");
                }
            });
    };

    const getTextareaClass = (error) => {
        let classes = [styles.textarea];
        if (error) classes.push(styles.textareaError);

        return classes.join(" ");
    };

    return (
        <div className={styles.uploadProductPage}>
            <Formik
                enableReinitialize={true}
                initialValues={{
                    title: "",
                    description: "",
                    category: (categories && categories[0].id) || "",
                    brand: (product.brands && product.brands[0].id) || "",
                    color: (product.colors && product.colors[0].id) || "",
                    status: (product.statuses && product?.statuses[0].id) || "",
                    price: "",
                    isOfferable: false,
                    imageUrl: "",
                }}
                validationSchema={Schemas.createProductSchema}
                onSubmit={(e) => {
                    _createProduct(e);
                }}
            >
                {({ handleChange, handleSubmit, setFieldValue, values, touched, errors }) => {
                    _setFieldValue = setFieldValue;
                    return (
                        <form
                            className={styles.form}
                            onSubmit={handleSubmit}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit();
                                }
                            }}
                        >
                            <div className={styles.formContainer}>
                                <div className={styles.productDetail}>
                                    <h1 className={styles.title}>Ürün Detayları</h1>
                                    <div className={styles.productName}>
                                        <label className={styles.label}>Ürün Adı</label>
                                        <Input.Input
                                            id="title"
                                            name="title"
                                            type="text"
                                            value={values.title}
                                            error={touched.title && errors.title}
                                            placeholder="Örnek: Iphone 12 Pro Max"
                                            onChangeInput={handleChange("title")}
                                        />
                                        <div className={styles.error}>{touched.title && errors.title}</div>
                                    </div>
                                    <div className={styles.productDescription}>
                                        <label className={styles.label}>Açıklama</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            type="textArea"
                                            rows={4}
                                            value={values.description}
                                            className={getTextareaClass(touched.description && errors.description)}
                                            placeholder="Ürün Açıklaması Girin"
                                            onChange={handleChange("description")}
                                        />
                                        <div className={styles.error}>{touched.description && errors.description}</div>
                                    </div>
                                    <div className={styles.categoryAndBrand}>
                                        <div>
                                            <label className={styles.label} for="cars">
                                                Kategori
                                            </label>
                                            <Input.Select
                                                datas={categories || []}
                                                displayValue="title"
                                                value={values.category}
                                                name="category"
                                                onChange={handleChange}
                                            />
                                            <div className={styles.error}>{touched.category && errors.category}</div>
                                        </div>
                                        <div>
                                            <label className={styles.label} for="cars">
                                                Marka
                                            </label>
                                            <Input.Select
                                                datas={product.brands || []}
                                                value={values.brand}
                                                displayValue="title"
                                                name="brand"
                                                onChange={handleChange}
                                            />
                                            <div className={styles.error}>{touched.brand && errors.brand}</div>
                                        </div>
                                    </div>
                                    <div className={styles.colorAndStatus}>
                                        <div>
                                            <label className={styles.label} for="cars">
                                                Color
                                            </label>
                                            <Input.Select
                                                datas={product.colors || []}
                                                value={values.color}
                                                displayValue="title"
                                                name="color"
                                                onChange={handleChange}
                                            />
                                            <div className={styles.error}>{touched.color && errors.color}</div>
                                        </div>
                                        <div>
                                            <label className={styles.label} for="cars">
                                                Kullanım Durumu
                                            </label>
                                            <Input.Select
                                                datas={product.statuses || []}
                                                value={values.status}
                                                displayValue="title"
                                                name="status"
                                                onChange={handleChange}
                                            />
                                            <div className={styles.error}>{touched.status && errors.status}</div>
                                        </div>
                                    </div>
                                    <div className={styles.priceAndOfferStatus}>
                                        <div>
                                            <label className={styles.label}>Fiyat</label>
                                            <Input.Input
                                                id="offer"
                                                name="offer"
                                                type="number"
                                                placeholder="Bir Fiyat Girin"
                                                value={values.price}
                                                error={touched.price && errors.price}
                                                suffix={<div>{PRICE_TYPE}</div>}
                                                onChangeInput={handleChange("price")}
                                            />
                                            <div className={styles.error}>{touched.price && errors.price}</div>
                                        </div>
                                        <div className={styles.offerStatus}>
                                            <label className={styles.label}>Teklif Opsiyonu</label>
                                            <div className={styles.switch}>
                                                {" "}
                                                <input
                                                    type="checkbox"
                                                    id="switch"
                                                    name="isOfferable"
                                                    value={values.offerStatus}
                                                    onChange={handleChange("isOfferable")}
                                                />
                                                <label for="switch">Toggle</label>{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.uploadImage}>
                                    <div {...getRootProps({ className: "dropzone" })}>
                                        {" "}
                                        <h1 className={styles.title}>Ürün Görseli</h1>
                                        {myFiles.length === 1 ? (
                                            !product.uploadImage ? (
                                                <div className={styles.acceptedFile}>
                                                    <img src={URL.createObjectURL(myFiles[0])} alt="selected pic" />
                                                    <div className={styles.removeIcon} onClick={removeImage}>
                                                        {" "}
                                                        <FaTimesCircle />{" "}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>Yukeniyorr</div>
                                            )
                                        ) : (
                                            <>
                                                <input {...getInputProps()} />
                                                <div className={styles.uploadContainer}>
                                                    <div className={styles.uploadIcon}>
                                                        <img src={upload_image} />
                                                    </div>
                                                    <p>Sürükleyip Bırakarak Yükle</p>
                                                    <p>Veya</p>
                                                    <div className={styles.selectImage}>Görsel Seçin</div>
                                                    <p className={styles.size}>
                                                        Png veya JPEG Dosya Boyutu: max. 100kb
                                                    </p>
                                                </div>
                                            </>
                                        )}
                                        <div className={styles.error}>{touched.imageUrl && errors.imageUrl}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.fieldWrapper}>
                                <Button
                                    text="Kaydet"
                                    className="primary"
                                    type="submit"
                                    onClick={() => handleSubmit()}
                                />
                            </div>
                        </form>
                    );
                }}
            </Formik>
            {(gettingCategories || product.getBrand || product.getColor || product.getStatus) && <Loader />}
        </div>
    );
};

export default UploadProductPage;
