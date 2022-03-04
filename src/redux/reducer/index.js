import { GET_DETAIL_PRODUCT, SEARCH_BY_NAME } from "../actions";
const initialStore = {
  productsloaded: [],
  detailProduct: [],
};

export default function reducer(state = initialStore, { type, payload }) {
  switch (type) {
    case GET_DETAIL_PRODUCT:
      return {
        ...state,
        detailProduct: payload,
      };

    case SEARCH_BY_NAME:
      return {
        ...state,
        productsloaded: payload,
      };
    default:
      return state;
  }
}
