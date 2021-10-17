import * as productActionTypes from "../actions/ProductActionTypes";

const initialState = {
    getProducts: false,
    products: null,
    getProductsError: null,

    getProduct: false,
    product: null,
    getProductError: null,

    createProduct: false,
    createdProduct: null,
    createProductError: null,

    uploadImage: false,
    uploadedImage: null,
    uploadImageError: false,

    getBrand: false,
    brands: null,
    getBrandError: null,

    getColor: false,
    colors: null,
    getColorError: null,

    getStatus: false,
    statuses: null,
    getStatusError: null,
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
        case productActionTypes.GET_PRODUCT: {
            return {
                ...state,
                getProduct: true,
            };
        }
        case productActionTypes.GET_PRODUCT_SUCCESS: {
            return {
                ...state,
                getProduct: false,
                product: action.payload.data,
                getProductError: null,
            };
        }
        case productActionTypes.GET_PRODUCT_FAIL: {
            return {
                ...state,
                getProduct: false,
                product: null,
                getProductError: action.error,
            };
        }
        case productActionTypes.CREATE_PRODUCT: {
            return {
                ...state,
                createProduct: true,
            };
        }
        case productActionTypes.CREATE_PRODUCT_SUCCESS: {
            return {
                ...state,
                createProduct: false,
                createdProduct: action.payload.data,
                createProductError: null,
            };
        }
        case productActionTypes.CREATE_PRODUCT_FAIL: {
            return {
                ...state,
                createProduct: false,
                createdProduct: null,
                createProductError: action.error,
            };
        }
        case productActionTypes.UPLOAD_IMAGE: {
            return {
                ...state,
                uploadImage: true,
            };
        }
        case productActionTypes.UPLOAD_IMAGE_SUCCESS: {
            return {
                ...state,
                uploadImage: false,
                uploadedImage: action.payload.data,
                uploadImageError: null,
            };
        }
        case productActionTypes.UPLOAD_IMAGE_FAIL: {
            return {
                ...state,
                uploadImage: false,
                uploadedImage: null,
                uploadImageError: action.error,
            };
        }
        case productActionTypes.GET_ALL_BRAND: {
            return {
                ...state,
                getBrand: true,
            };
        }
        case productActionTypes.GET_ALL_BRAND_SUCCESS: {
            return {
                ...state,
                getBrand: false,
                brands: action.payload.data,
                getBrandError: null,
            };
        }
        case productActionTypes.GET_ALL_BRAND_FAIL: {
            return {
                ...state,
                getBrand: false,
                brands: null,
                getBrandError: action.error,
            };
        }
        case productActionTypes.GET_ALL_COLOR: {
            return {
                ...state,
                getColor: true,
            };
        }
        case productActionTypes.GET_ALL_COLOR_SUCCESS: {
            return {
                ...state,
                getColor: false,
                colors: action.payload.data,
                getColorError: null,
            };
        }
        case productActionTypes.GET_ALL_COLOR_FAIL: {
            return {
                ...state,
                getColor: false,
                colors: null,
                getColorError: action.error,
            };
        }
        case productActionTypes.GET_ALL_STATUS: {
            return {
                ...state,
                getStatus: true,
            };
        }
        case productActionTypes.GET_ALL_STATUS_SUCCESS: {
            return {
                ...state,
                getStatus: false,
                statuses: action.payload.data,
                getStatusError: null,
            };
        }
        case productActionTypes.GET_ALL_STATUS_FAIL: {
            return {
                ...state,
                getStatus: false,
                statuses: null,
                getStatusError: action.error,
            };
        }

        default:
            return state;
    }
};

export default accountReducer;
