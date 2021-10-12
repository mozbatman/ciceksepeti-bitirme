import React, { useRef } from "react";
import styles from "./Input.module.scss";

const Input = ({ prefix, suffix, id, type, placeholder, name, className, onClick, onChangeInput, value }) => {
    const inputEl = useRef();

    return (
        <div className={styles.input}>
            <div className={styles.inputWrap}>
                {prefix && <div className="mr-1 input-prefix"> {prefix}</div>}
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    className={className}
                    onClick={onClick}
                    ref={inputEl}
                    onChange={(e) => onChangeInput(e.target.value)}
                    value={value}
                />
                {suffix && <div className={styles.suffix}>{suffix}</div>}
            </div>
        </div>
    );
};

const Select = ({ value, onChange, datas }) => {
    return (
        <div className={styles.select}>
            <select value={value} onChange={onChange}>
                {
                    datas.map(item => {
                        return <option value={item}>{item}</option>
                    })
                }
            </select>
        </div>
    );
};

export default {
    Input: Input,
    Select: Select
};
