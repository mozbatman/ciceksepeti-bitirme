import styles from "./Button.module.scss";

const Button = ({ text, type, className, submit, disabled, onClick, onMouseOver, onMouseOut }) => {
    const getClassName = () => {
        let cname = [styles.btn];
        cname.push(styles["btn" + type]);
        if (className) cname.push(styles[className]);
        return cname.join(" ");
    };
    return (
        <button
            className={getClassName()}
            onClick={onClick}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            disabled={!!disabled}
            type={submit ? "submit" : "button"}
        >
            {text}
        </button>
    );
};

export default Button;
