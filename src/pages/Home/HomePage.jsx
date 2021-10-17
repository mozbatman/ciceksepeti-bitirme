import styles from "./HomePage.module.scss";
import banner from "../../assets/images/Banner1@2x.png";
import ScrollableMenu from "../../components/shared/ScrollableMenu/ScrollableMenu";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProduct } from "../../actions/ProductActions";
import ProductCard from "../../components/Product/ProductCard/ProductCard";
import { useHistory } from "react-router";
import Loader from "../../components/shared/Loader/Loader";

const BANNER_ALT = "banner";

const HomePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector((state) => state.product.products);
    const gettingProducts = useSelector((state) => state.product.getProducts);
    const [category, setCategory] = useState();

    useEffect(() => {
        dispatch(getAllProduct());
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(history.location.search);
        const category = query.get("category");
        setCategory(category);
    }, [history.location.search]);

    const changeSeachParams = (categoryId) => {
        if (categoryId) {
            history.push({
                pathname: "/",
                search: `?category=${categoryId}`,
            });
        } else {
            history.push("/");
        }
    };

    return (
        <main className={styles.home}>
            <div className={styles.banner}>
                <img src={banner} alt={BANNER_ALT} />
            </div>
            <ScrollableMenu changeSeachParams={changeSeachParams} category={category}  />
            <section className={styles.products}>
                {products?.filter(p => category ? p.category.id === category : p).map((product) => (
                    <ProductCard product={product} key={product.id}/>
                ))}
            </section>
            {
                (gettingProducts) && <Loader />
            } 
        </main>
    );
};

export default HomePage;
