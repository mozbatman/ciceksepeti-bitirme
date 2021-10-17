import styles from "./Header.module.scss";
import logo from "../../../assets/logo/logo.svg";
import { FaPlus, FaUser } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router";

const LOGO_ALT = "logo";

const Header = () => {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['authToken']);

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logo} onClick={() => history.push('/')}>
                    <img src={logo} alt={LOGO_ALT} />
                </div>
                <div className={styles.rightContent}>
                    {typeof(cookies["authToken"]) !== "undefined" ? (
                        <>
                            <div className={styles.addProduct} onClick={() => history.push('/upload-product')}>
                                {" "}
                                <FaPlus /> <div className={styles.addProductButton}> Ürün Ekle </div>
                            </div>
                            <div className={styles.account} onClick={() => history.push('/account')}>
                                {" "}
                                <FaUser /> Hesabım
                            </div>
                        </>
                    ) : (
                        <div className={styles.account} onClick={() => history.push('/auth')}>
                            {" "}
                            <FaUser /> Giriş Yap
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
