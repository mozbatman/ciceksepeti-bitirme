import styles from "./HomePage.module.scss";
import banner from "../../assets/images/Banner1@2x.png";
import ScrollableMenu from "../../components/shared/ScrollableMenu/ScrollableMenu";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllProduct } from "../../actions/ProductActions";
import ProductCard from "../../components/Product/ProductCard/ProductCard";

const BANNER_ALT = "banner";

const HomePage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);

    useEffect(() => {
        dispatch(getAllProduct());
    }, []);

    return (
        <main className={styles.home}>
            <div className={styles.banner}>
                <img src={banner} alt={BANNER_ALT} />
            </div>
            <ScrollableMenu />
            <section className={styles.products}>
              {
                products?.map(product => <ProductCard product={product} key={product.id}/>)
              }
            </section>
        </main>
    );
};

export default HomePage;
