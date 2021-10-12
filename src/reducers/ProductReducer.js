import * as productActionTypes from "../actions/ProductActionTypes";

const initialState = {
    getProducts: false,
    products: null,
    getProductsError: null,
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case productActionTypes.GET_ALL_PRODUCT: {
            return {
                ...state,
                getProducts: true,
            };
        }
        case productActionTypes.GET_ALL_PRODUCT_SUCCESS: {
            return {
                ...state,
                getProducts: false,
                products: action.payload.data,
                getProductsError: null,
            };
        }
        case productActionTypes.GET_ALL_PRODUCT_FAIL: {
            return {
                ...state,
                getProducts: false,
                products: null,
                getProductsError: action.error,
            };
        }

        default:
            return state;
    }
};

export default accountReducer;
