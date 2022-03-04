import axios from "axios";
export const GET_DETAIL_PRODUCT = "GET_DETAIL_PRODUCT";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";

export const getDetailProduct = (id) => {
  return async (dispatch) => {
    try {
      const detailProduct = await axios.get(`http://products?id=${id}`);
      dispatch({
        type: GET_DETAIL_PRODUCT,
        payload: detailProduct,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const serchByName = (nameoffood) => {
  return async (dispatch) => {
    try {
      const found_product = await axios.get(
        `http://products?name=${nameoffood}`
      );
      dispatch({
        type: SEARCH_BY_NAME,
        payload: found_product,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
