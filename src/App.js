import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import AppRoute from "./components/shared/AppRoute";
import AppAuthorizeRoute from "./components/shared/AppAuthorizeRoute";
import AppLayout from "./layouts/AppLayout/AppLayout";
import HomePage from "./pages/Home/HomePage";
import ProductDetailPage from "./pages/ProductDetail/ProductDetailPage";
import AuthPage from "./pages/Auth/AuthPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {getAllCategory} from './actions/CategoryActions';
import AccountPage from "./pages/Account/AccountPage";
import UploadProductPage from "./pages/UploadProduct/UploadProductPage";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  },[])

  return (
    <Router>
        <div className="App">
          <Switch>
            <AppAuthorizeRoute exact path="/account" layout={AppLayout} component={AccountPage} layoutProps={{ header: true }} />
            <AppAuthorizeRoute exact path="/upload-product" layout={AppLayout} component={UploadProductPage} layoutProps={{ header: true }} />
            <AppRoute exact path="/auth" layout={AppLayout} component={AuthPage} layoutProps={{ header: false }} />
            <AppRoute exact path="/product/:id" layout={AppLayout} component={ProductDetailPage} layoutProps={{ header: true }} />
            <AppRoute exact path="/" layout={AppLayout} component={HomePage} layoutProps={{ header: true }} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
