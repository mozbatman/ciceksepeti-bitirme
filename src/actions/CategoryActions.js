import { GET_ALL_CATEGORY } from "./CategoryActionTypes";

const getCategoryEndpoint = () => '/detail/category';

export const getAllCategory = () => {
  return {
    type: GET_ALL_CATEGORY,
    payload: {
      request: {
        method: 'GET',
        url: getCategoryEndpoint() + '/all'
      },
    },
  };
};