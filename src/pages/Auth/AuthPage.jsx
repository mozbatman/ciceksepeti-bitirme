import { useState } from "react";
import styles from "./AuthPage.module.scss";
import image from "../../assets/images/login.png";
import SignIn from "../../components/auth/SignIn/SignIn";
import SignUp from "../../components/auth/SignUp/SignUp";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "../../actions/AccountActions";
import { useHistory } from "react-router";
import { toastError } from "../../components/shared/toast";
import { toast } from "react-toastify";

const AuthPage = () => {
    const history = useHistory();
    const [signin, setSignin] = useState(true);
    const dispatch = useDispatch();

    const signInHandler = async (credential) => {
        let response = await dispatch(signIn(credential));
        console.log(response?.error?.response?.status);
        if (response?.payload?.status === 200 || response?.payload?.status === 201) {
            history.push("/");
        } else if (response?.error?.response?.status === 401) {
            toastError("Emailiniz veya şifreniz hatalı.");
        }
    };

    const signUpHandler = async (credential) => {
        let response = await dispatch(signUp(credential));
        if (response.payload.status === 200 || response.payload.status === 201) {
            history.push("/");
        }
    };

    const changeStatus = (status) => setSignin(status);

    return (
        <div className={styles.pageAuth}>
            <div className={styles.imageSection}>
                <img src={image} />
            </div>
            {signin ? (
                <SignIn signIn={signInHandler} changeStatus={changeStatus} />
            ) : (
                <SignUp signUp={signUpHandler} changeStatus={changeStatus} />
            )}
        </div>
    );
};

export default AuthPage;
