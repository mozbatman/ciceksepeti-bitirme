import { Formik } from "formik";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import Input from "../../components/form/Input/Input";
import Button from "../../components/form/Button/Button";
import uploadImage from "../../assets/images/upload2x.png";
import styles from "./UploadProductPage.module.scss";
import { FaTimesCircle } from "react-icons/fa";
import { useCallback, useState } from "react";

const PRICE_TYPE = "TL";

const UploadProductPage = () => {
    const [myFiles, setMyFiles] = useState([]);

    const onDrop = useCallback(
        (acceptedFiles) => {
            setMyFiles([...myFiles, ...acceptedFiles]);
        },
        [myFiles]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: "image/jpeg, image/png",
        maxFiles: 1,
        maxSize: 102400,
    });

    const removeImage = () => {
        setMyFiles([]);
    };

    return (
        <div className={styles.uploadProductPage}>
            <Formik
                initialValues={{
                    name: "",
                    description: "",
                    category: "",
                    brand: "",
                    color: "",
                    status: "",
                    price: "",
                    offerStatus: false,
                }}
                onSubmit={(e) => {
                    console.log(e);
                }}
            >
                {({ handleChange, handleSubmit, setFieldValue, values, touched, errors }) => {
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
                                    <h1>Ürün Detayları</h1>
                                    <div className={styles.productName}>
                                        <label>Ürün Adı</label>
                                        <Input.Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={values.name}
                                            placeholder="Örnek: Iphone 12 Pro Max"
                                            onChangeInput={handleChange("name")}
                                        />
                                    </div>
                                    <div className={styles.productDescription}>
                                        <label>Açıklama</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            type="textArea"
                                            rows={4}
                                            value={values.description}
                                            className={styles.textarea}
                                            placeholder="Ürün Açıklaması Girin"
                                            onChange={handleChange("description")}
                                        />
                                    </div>
                                    <div className={styles.categoryAndBrand}>
                                        <div>
                                            <label for="cars">Kategori</label>
                                            <Input.Select
                                                datas={[1, 2, 3, 4, 5]}
                                                value={values.category}
                                                onChange={handleChange("category")}
                                            />
                                        </div>
                                        <div>
                                            <label for="cars">Marka</label>
                                            <Input.Select
                                                datas={[1, 2, 3, 4, 5]}
                                                value={values.brand}
                                                onChange={handleChange("brand")}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.colorAndStatus}>
                                        <div>
                                            <label for="cars">Color</label>
                                            <Input.Select
                                                datas={[1, 2, 3, 4, 5]}
                                                value={values.color}
                                                onChange={handleChange("color")}
                                            />
                                        </div>
                                        <div>
                                            <label for="cars">Kullanım Durumu</label>
                                            <Input.Select
                                                datas={[1, 2, 3, 4, 5]}
                                                value={values.status}
                                                onChange={handleChange("status")}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.priceAndOfferStatus}>
                                        <div>
                                            <label>Fiyat</label>
                                            <Input.Input
                                                id="offer"
                                                name="offer"
                                                type="number"
                                                placeholder="Bir Fiyat Girin"
                                                value={values.price}
                                                suffix={<div>{PRICE_TYPE}</div>}
                                                onChangeInput={handleChange("price")}
                                            />
                                        </div>
                                        <div className={styles.offerStatus}>
                                            <label>Teklif Opsiyonu</label>
                                            <div className={styles.switch}>
                                                {" "}
                                                <input
                                                    type="checkbox"
                                                    id="switch"
                                                    value={values.offerStatus}
                                                    onChange={handleChange("offerStatus")}
                                                />
                                                <label for="switch">Toggle</label>{" "}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.uploadImage}>
                                    <div {...getRootProps({ className: "dropzone" })}>
                                        {" "}
                                        <h1>Ürün Görseli</h1>
                                        {myFiles.length === 1 ? (
                                            <div className={styles.acceptedFile}>
                                                <img src={URL.createObjectURL(myFiles[0])} alt="selected pic" />
                                                <div className={styles.removeIcon} onClick={removeImage}>
                                                    {" "}
                                                    <FaTimesCircle />{" "}
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <input {...getInputProps()} />
                                                <div className={styles.uploadContainer}>
                                                    <div className={styles.uploadIcon}>
                                                        <img src={uploadImage} />
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

            <div className={styles.productImage}></div>
        </div>
    );
};

export default UploadProductPage;
