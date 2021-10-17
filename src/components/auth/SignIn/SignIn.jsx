import { Formik } from "formik";
import Schemas from "../../../schemas";
import Input from "../../form/Input/Input";
import styles from "./SignIn.module.scss";
import logo from "../../../assets/logo/logo.svg";
import Button from "../../form/Button/Button";

const LOGO_ALT = "logo";

const SignIn = ({ signIn, changeStatus }) => {
    const onSubmitHandler = (e) => {
        signIn(e);
    };

    return (
        <div className={styles.signIn}>
            <div className={styles.logo}>
                <img src={logo} alt={LOGO_ALT} />
            </div>
            <div className={styles.form}>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={Schemas.loginSchema}
                    onSubmit={(e) => { onSubmitHandler(e)}}
                >
                    {({ handleChange, handleSubmit, setFieldValue, values, touched, errors }) => {
                        return (
                            <form
                                onSubmit={handleSubmit}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleSubmit();
                                    }
                                }}
                            >
                                <div className={styles.formContainer}>
                                    <h1 className={styles.formHeader}> Giriş Yap </h1>
                                    <p className={styles.formSubTitle}> Fırsatlardan yararlanmak için giriş yap! </p>
                                    <div className={styles.fieldWrapper}>
                                        <label className={styles.label}>Email</label>
                                        <Input.Input
                                            id="email"
                                            name="email"
                                            type="text"
                                            error={touched.email && errors.email}
                                            placeholder="Email@example.com"
                                            onChangeInput={handleChange("email")}
                                        />
                                    </div>
                                    <div className={styles.error}> {touched.email && errors.email} </div>
                                    <div className={styles.fieldWrapper}>
                                        <label className={styles.label}>Şifre</label>
                                        <Input.Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            error={touched.password && errors.password}
                                            onChangeInput={handleChange("password")}
                                        />
                                    </div>
                                    <div className={styles.error}>
                                        {" "}
                                        {touched.password &&
                                            (errors.password ||
                                                (false ? "Email veya parolanızı hatalı girdiniz.." : null))}{" "}
                                    </div>
                                    <div className={styles.lostPassword}>Şifremi Unuttum</div>
                                    <div className={styles.fieldWrapper}>
                                        <Button
                                            text="Giriş"
                                            className="primary"
                                            type="submit"
                                            onClick={() => handleSubmit()}
                                        />
                                    </div>
                                    <div className={styles.noAccount}>
                                        Hesabın yok mu? <div className={styles.signUp} onClick={() => changeStatus(false)}>Üye Ol</div>
                                    </div>
                                </div>
                            </form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default SignIn;
