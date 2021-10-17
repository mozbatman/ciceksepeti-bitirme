import { BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import AppRoute from "./components/shared/AppRoute";
import AppAuthorizeRoute from "./components/shared/AppAuthorizeRoute";
import AppLayout from "./layouts/AppLayout/AppLayout";
import { getAllCategory } from "./actions/CategoryActions";
import client from "./axiosConfig";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/shared/Loader/Loader";

const AccountPage = lazy(() => import("./pages/Account/AccountPage"));
const AuthPage = lazy(() => import("./pages/Auth/AuthPage"));
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetail/ProductDetailPage"));
const UploadProductPage = lazy(() => import("./pages/UploadProduct/UploadProductPage"));

function App() {
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(["authToken"]);

    useEffect(() => {
        dispatch(getAllCategory());

        if (typeof cookies["authToken"] !== "undefined") {
            client.defaults.headers.common["Authorization"] = "Bearer " + cookies["authToken"];
        }
    }, []);

    return (
        <Router>
            <div className="App">
                <Suspense fallback={<Loader />}>
                    <Switch>
                        <AppAuthorizeRoute
                            exact
                            path="/account"
                            layout={AppLayout}
                            component={AccountPage}
                            layoutProps={{ header: true }}
                        />
                        <AppAuthorizeRoute
                            exact
                            path="/upload-product"
                            layout={AppLayout}
                            component={UploadProductPage}
                            layoutProps={{ header: true }}
                        />
                        <AppRoute
                            exact
                            path="/auth"
                            layout={AppLayout}
                            component={AuthPage}
                            layoutProps={{ header: false }}
                        />
                        <AppRoute
                            exact
                            path="/product/:id"
                            layout={AppLayout}
                            component={ProductDetailPage}
                            layoutProps={{ header: true }}
                        />
                        <AppRoute
                            exact
                            path="/"
                            layout={AppLayout}
                            component={HomePage}
                            layoutProps={{ header: true }}
                        />
                    </Switch>
                </Suspense>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Router>
    );
}

export default App;
