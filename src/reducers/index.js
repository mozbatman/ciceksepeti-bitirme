import { combineReducers } from "redux";
import accountReducer from "./AccountReducer";
import categoryReducer from "./CategoryReducer";
import productReducer from "./ProductReducer";

export default combineReducers({
    account: accountReducer,
    category: categoryReducer,
    product: productReducer,
});
