import { GET_DETAIL_PRODUCT } from "../actions";

const initialStore = {
  products: [],
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
    default:
      return state;
  }
}
