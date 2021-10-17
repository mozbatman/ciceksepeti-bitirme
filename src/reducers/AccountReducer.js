import * as accountActionTypes from "../actions/AccountActionTypes";
import auth from "../helpers/auth";

const initialState = {
    loggingIn: false,
    userToken: null,
    loginError: null,

    getGivenOffers: false,
    givenOffers: null,
    getGivenOffersError: null,

    getReceivedOffers: false,
    receivedOffers: null,
    getReceivedOffersError: null,
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case accountActionTypes.SIGN_IN: {
            return {
                ...state,
                loggingIn: true,
            };
        }
        case accountActionTypes.SIGN_IN_SUCCESS: {
            auth.setAuthToken(action.payload.data.access_token);

            return {
                ...state,
                loggingIn: false,
                userToken: action.payload.data.access_token,
                loginError: null,
            };
        }
        case accountActionTypes.SIGN_IN_FAIL: {
            return {
                ...state,
                loggingIn: false,
                user: null,
                loginError: action.error,
            };
        }
        case accountActionTypes.GET_GIVEN_OFFERS: {
            return {
                ...state,
                getGivenOffers: true,
            };
        }
        case accountActionTypes.GET_GIVEN_OFFERS_SUCCESS: {
            return {
                ...state,
                getGivenOffers: false,
                givenOffers: action.payload.data,
                getGivenOffersError: null,
            };
        }
        case accountActionTypes.GET_GIVEN_OFFERS_FAIL: {
            return {
                ...state,
                getGivenOffers: false,
                givenOffers: null,
                getGivenOffersError: action.error,
            };
        }
        case accountActionTypes.GET_RECEIVED_OFFERS: {
            return {
                ...state,
                getReceivedOffers: true,
            };
        }
        case accountActionTypes.GET_RECEIVED_OFFERS_SUCCESS: {
            return {
                ...state,
                getReceivedOffers: false,
                receivedOffers: action.payload.data,
                getReceivedOffersError: null,
            };
        }
        case accountActionTypes.GET_RECEIVED_OFFERS_FAIL: {
            return {
                ...state,
                getReceivedOffers: false,
                receivedOffers: null,
                getReceivedOffersError: action.error,
            };
        }

        default:
            return state;
    }
};

export default accountReducer;
