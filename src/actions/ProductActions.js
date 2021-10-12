import { GET_ALL_PRODUCT, GET_PRODUCT, OFFER_PRODUCT, PURCHASE_PRODUCT } from "./ProductActionTypes";

const getProductEndpoint = () => '/product';

export const getAllProduct = () => {
  return {
    type: GET_ALL_PRODUCT,
    payload: {
      request: {
        method: 'GET',
        url: getProductEndpoint() + '/all'
      },
    },
  };
};

export const getProduct = (id) => {
  return {
    type: GET_PRODUCT,
    payload: {
      request: {
        method: 'GET',
        url: getProductEndpoint() + `/${id}`
      },
    },
  };
};

export const purchaseProduct = (id) => {
  return {
    type: PURCHASE_PRODUCT,
    payload: {
      request: {
        method: 'POST',
        url: getProductEndpoint() + `/purchase/${id}`
      },
    },
  };
};

export const offerProduct = (id, payload) => {
  return {
    type: OFFER_PRODUCT,
    payload: {
      request: {
        method: 'POST',
        url: getProductEndpoint() + `/offer/${id}`,
        data: payload
      },
    },
  };
};