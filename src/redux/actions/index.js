import axios from "axios";
export const GET_DETAIL_PRODUCT = "GET_DETAIL_PRODUCT";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const getallproducts = () => {
  return async (dispatch) => {
    try {
      const allproducts = await axios.get(
        "https://back-end-prueba.herokuapp.com/products"
      );
      // console.log(allproducts);

      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: allproducts.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDetailProduct = (id) => {
  return async (dispatch) => {
    try {
      const detailProduct = await axios.get(
        `https://back-end-prueba.herokuapp.com/products?id=${id}`
      );
      dispatch({
        type: GET_DETAIL_PRODUCT,
        payload: detailProduct.data[0],
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchByName = (nameoffood) => {
  return async (dispatch) => {
    try {
      const found_product = await axios.get(
        `https://back-end-prueba.herokuapp.com/products?name=${nameoffood}`
      );
      dispatch({
        type: SEARCH_BY_NAME,
        payload: found_product.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
