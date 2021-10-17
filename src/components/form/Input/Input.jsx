import React, { useRef, useState } from "react";
import styles from "./Input.module.scss";

const Input = ({ suffix, id, type, placeholder, name, className, onClick, onChangeInput, value, error }) => {
    const inputEl = useRef();
    const [focus, setFocus] = useState(false);

    const getClassName = () => {
        let classes = [styles.input];
        if (focus) classes.push(styles.focus);
        if (error?.length > 0) classes.push(styles.error)

        return classes.join(" ");
    };

    return (
        <div className={getClassName()}>
            <div className={styles.inputWrap}>
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    className={className}
                    onClick={onClick}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    ref={inputEl}
                    onChange={(e) => onChangeInput(e.target.value)}
                    value={value}
                />
                {suffix && <div className={styles.suffix}>{suffix}</div>}
            </div>
        </div>
    );
};

const Select = ({ value, onChange, datas, displayValue, name }) => {
    const [focus, setFocus] = useState(false);

    const getClassName = () => {
        let classes = [styles.select];
        if (focus) classes.push(styles.selectFocus);

        return classes.join(" ");
    };

    return (
        <div className={getClassName()}>
            <select name={name} value={value.id} onChange={onChange} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
                {datas.map((item) => {
                    return <option value={item.id} key={item.id}>{item[displayValue]}</option>;
                })}
            </select>
        </div>
    );
};

export default {
    Input: Input,
    Select: Select,
};
