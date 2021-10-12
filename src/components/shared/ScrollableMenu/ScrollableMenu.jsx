import React from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import styles from "./ScrollableMenu.module.scss";

const getItems = () =>
    Array(20)
        .fill(0)
        .map((_, ind) => ({ id: `element-${ind}` }));

const ScrollableMenu = () => {
    const [items, setItems] = React.useState(getItems);
    const [selected, setSelected] = React.useState([]);
    const [position, setPosition] = React.useState(0);

    const isItemSelected = (id) => !!selected.find((el) => el === id);

    const handleClick =
        (id) =>
        ({ getItemById, scrollToItem }) => {
            const itemSelected = isItemSelected(id);

            setSelected((currentSelected) =>
                itemSelected ? currentSelected.filter((el) => el !== id) : currentSelected.concat(id)
            );
        };

    const onUpdate = (position) => {
      console.log(position)
      setPosition(position)
    }

    return (
        <ScrollMenu alignCenter={true} dragging={true} onUpdate={setPosition} translate={position}>
            {items.map(({ id }) => (
                <div className={styles.menuItem} itemId={id} key={id} selected={isItemSelected(id)}>
                    {id}
                </div>
            ))}
        </ScrollMenu>
    );
};

export default ScrollableMenu;
