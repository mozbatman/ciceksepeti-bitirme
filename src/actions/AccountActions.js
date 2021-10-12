import { GET_GIVEN_OFFERS, GET_RECEIVED_OFFERS, SIGN_IN } from "./AccountActionTypes";

const getSigninEndpoint = () => '/authorization/signin';
const getOfferEndpoint = () => '/account';

export const signIn = (credential) => {
  return {
    type: SIGN_IN,
    payload: {
      request: {
        method: 'POST',
        url: getSigninEndpoint(),
        data: credential,
      },
    },
  };
};

export const getGivenOffers = () => {
  return {
    type: GET_GIVEN_OFFERS,
    payload: {
      request: {
        method: 'GET',
        url: getOfferEndpoint() + '/given-offers',
      },
    },
  };
};

export const getReceivedOffers = () => {
  return {
    type: GET_RECEIVED_OFFERS,
    payload: {
      request: {
        method: 'GET',
        url: getOfferEndpoint() + '/received-offers',
      },
    },
  };
};