import { useState } from "react";
import styles from "./AuthPage.module.scss";
import image from "../../assets/images/login.png";
import SignIn from "../../components/auth/SignIn/SignIn";
import SignUp from "../../components/auth/SignUp/SignUp";
import { useDispatch } from "react-redux";
import { signIn } from "../../actions/AccountActions";
import { useHistory } from "react-router";

const AuthPage = () => {
    const history = useHistory();
    const [signin, setSignin] = useState(true);
    const dispatch = useDispatch();

    const signInHandler = async (credential) => {
        let response = await dispatch(signIn(credential));
        if (response.payload.status === 200 || response.payload.status === 201) {
            history.push('/');
        }
    }

    const changeStatus = status => setSignin(status);

    return (
        <div className={styles.pageAuth}>
            <div className={styles.imageSection}>
                <img src={image} />
            </div>
            {signin ? <SignIn signIn={signInHandler} changeStatus={changeStatus} /> : <SignUp changeStatus={changeStatus} />}
        </div>
    );
};

export default AuthPage;
