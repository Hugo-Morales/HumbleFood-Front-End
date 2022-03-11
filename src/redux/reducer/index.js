import {
  GET_SHOPS,
  GET_DETAIL_PRODUCT,
  SEARCH_BY_NAME,
  GET_ALL_PRODUCTS,
  GET_CATEGORIES,
  GET_PRODUCTS_SHOP,
  RESET,
  LOADING,
  POST_NEW_SHOP,
  FILTER_BY_CATEGORIES,
  FILTER_BY_DISCOUNT,
  GET_SHOPS_ID,
  GET_DATA_USER,
} from "../actions";

const initialStore = {
  shop: [],
  shops: [],
  productsloaded: [],
  allproducts: [],
  detailProduct: [],
  categories: [],
  productShop: [],
  postnewShop: [],
  dataUser: {},
  isLoading: true,
};

export default function reducer(state = initialStore, { type, payload }) {
  switch (type) {
    case GET_SHOPS:
      return {
        ...state,
        shops: payload,
        isLoading: false,
      };
    case GET_SHOPS_ID:
      return {
        ...state,
        shop: payload,
        isLoading: false,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        productsloaded: payload,
        isLoading: false,
      };
    case GET_DATA_USER:
      return {
        ...state,
        dataUser: payload.user,
      };
    case GET_DETAIL_PRODUCT:
      return {
        ...state,
        detailProduct: payload,
        isLoading: false,
      };
    case SEARCH_BY_NAME:
      return {
        ...state,
        productsloaded: payload,
      };
    case POST_NEW_SHOP:
      return {
        ...state,
        postnewShop: payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case GET_PRODUCTS_SHOP:
      return {
        ...state,
        productShop: payload,
        isLoading: false,
      };
    case RESET:
      return {
        ...state,
        detailProduct: [],
        isLoading: true,
      };
    case LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case FILTER_BY_CATEGORIES:
      const productsloaded = state.productsloaded
      // console.log(state.allproducts)
      const typesFiltered = payload === 'All' ? productsloaded : productsloaded.products?.filter((el) => el.categories[0] === payload || el.categories[1] === payload)
      // si mi payload es todo , me devolves todo. Sino entra a allpokemons y filtramelo por le payload que te llega, por payload le pasamos cada una de los status que tengo el back entonces al value de la etiqueta option le pongo lo que tengo en el back pq es lo que me llegara por payload y va a tener que coincidir en el filtro 
      console.log(typesFiltered)
      return {
        ...state,
        productsloaded: typesFiltered
      }
    case FILTER_BY_DISCOUNT:
      let probando = state.productsloaded
      console.log(probando)
      if (payload === 'ofertas') {
        if (payload.discount > 50)
          console.log(payload.discount)
        return {
          ...state,
          productsloaded: probando
        }
      }

    default:
      return state;
  }
}
