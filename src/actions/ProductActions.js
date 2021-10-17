import { CREATE_PRODUCT, GET_ALL_BRAND, GET_ALL_COLOR, GET_ALL_PRODUCT, GET_ALL_STATUS, GET_PRODUCT, OFFER_PRODUCT, PURCHASE_PRODUCT, UPLOAD_IMAGE } from "./ProductActionTypes";

const getProductEndpoint = () => '/product';
const getFileEndpoint = () => '/file/upload/image';
const getDetailEndPoint = () => "/detail";

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
        method: 'PUT',
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

export const createProduct = (payload) => {
  return {
    type: CREATE_PRODUCT,
    payload: {
      request: {
        method: 'POST',
        url: getProductEndpoint() + `/create`,
        data: payload
      },
    },
  };
};

export const uploadImage = (payload) => {
  return {
    type: UPLOAD_IMAGE,
    payload: {
      request: {
        method: 'POST',
        url: getFileEndpoint(),
        headers: {
          'content-type': 'multipart/form-data'
        },
        data: payload
      },
    },
  };
};

export const getAllColor = () => {
  return {
    type: GET_ALL_COLOR,
    payload: {
      request: {
        method: 'GET',
        url: getDetailEndPoint() + '/color/all'
      },
    },
  };
};

export const getAllBrand = () => {
  return {
    type: GET_ALL_BRAND,
    payload: {
      request: {
        method: 'GET',
        url: getDetailEndPoint() + '/brand/all'
      },
    },
  };
};

export const getAllStatus = () => {
  return {
    type: GET_ALL_STATUS,
    payload: {
      request: {
        method: 'GET',
        url: getDetailEndPoint() + '/status/all'
      },
    },
  };
};