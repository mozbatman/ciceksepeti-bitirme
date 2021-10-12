import * as categoryActionTypes from "../actions/CategoryActionTypes";

const initialState = {
    getCategories: false,
    categories: null,
    getCategoriesError: null,
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case categoryActionTypes.GET_ALL_CATEGORY: {
            return {
                ...state,
                getCategories: true,
            };
        }
        case categoryActionTypes.GET_ALL_CATEGORY_SUCCESS: {
            return {
                ...state,
                getCategories: false,
                categories: action.payload.data,
                getCategoriesError: null,
            };
        }
        case categoryActionTypes.GET_ALL_CATEGORY_FAIL: {
            return {
                ...state,
                getCategories: false,
                categories: null,
                getCategoriesError: action.error,
            };
        }

        default:
            return state;
    }
};

export default accountReducer;
