import { ACCEPT_OFFER, CANCEL_OFFER, GET_GIVEN_OFFERS, GET_RECEIVED_OFFERS, REJECT_OFFER, SIGN_IN, SIGN_UP } from "./AccountActionTypes";

const getSigninEndpoint = () => '/authorization/signin';
const getSignupEndpoint = () => '/authorization/signup';
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

export const signUp = (credential) => {
  return {
    type: SIGN_UP,
    payload: {
      request: {
        method: 'POST',
        url: getSignupEndpoint(),
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

export const rejectOffer = (id) => {
  return {
    type: REJECT_OFFER,
    payload: {
      request: {
        method: 'POST',
        url: getOfferEndpoint() + '/reject-Offer/' + id,
      },
    },
  };
}

export const acceptOffer = (id) => {
  return {
    type: ACCEPT_OFFER,
    payload: {
      request: {
        method: 'PUT',
        url: getOfferEndpoint() + '/accept-offer/' + id,
      },
    },
  };
}

export const cancelOffer = (id) => {
  return {
    type: CANCEL_OFFER,
    payload: {
      request: {
        method: 'DELETE',
        url: getOfferEndpoint() + '/cancel-offer/' + id,
      },
    },
  };
}