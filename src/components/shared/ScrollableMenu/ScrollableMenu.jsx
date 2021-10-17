import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./ScrollableMenu.module.scss";

const getMenuItemClass = (selected) => {
    let classes = [styles.menuItem];
    if (selected) classes.push(styles.active);
    return classes.join(" ");
};

const MenuItem = ({ text, id, selected, setSelected, changeSeachParams }) => {
    return <div className={getMenuItemClass(selected)} onClick={() => {setSelected(id); changeSeachParams(id)}} >{text}</div>;
};

const ScrollableMenu = ({ changeSeachParams }) => {
    const categories = useSelector((state) => state.category.categories);
    const [items, setItems] = React.useState([{ id: 0, title: "Hepsi" }]);
    const [selected, setSelected] = React.useState(items[0].id);

    useEffect(() => {
        if (categories?.length) setItems([{ id: 0, title: "Hepsi" }, ...categories]);
    }, [categories])

    return (
        <div className={styles.menu}>
            {items?.map((el) => {
                const { id, title } = el;

                return <MenuItem text={title} key={id} id={id} selected={selected === id} setSelected={setSelected} changeSeachParams={changeSeachParams} />;
            })}
        </div>
    );
};

export default ScrollableMenu;
