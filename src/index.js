import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </CookiesProvider>,
    document.getElementById("root")
);
