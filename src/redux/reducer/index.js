import {
  GET_DETAIL_PRODUCT,
  SEARCH_BY_NAME,
  GET_ALL_PRODUCTS,
  RESET,
  LOADING,
} from "../actions";

const initialStore = {
  productsloaded: [],
  detailProduct: [],
  isLoading: true,
};

export default function reducer(state = initialStore, { type, payload }) {
  switch (type) {
    case GET_ALL_PRODUCTS: return {
      ...state,
      productsloaded: payload,
      isLoading: false,
    };
    case GET_DETAIL_PRODUCT: return {
      ...state,
      detailProduct: payload,
      isLoading: false,
    };
    case SEARCH_BY_NAME: return {
      ...state,
      productsloaded: payload,
    };
    case RESET: return {
      ...state,
      detailProduct: [],
      isLoading: true,
    }
    case LOADING: return {
      ...state,
      isLoading: true,
    }
    default: return state;
  }
}
