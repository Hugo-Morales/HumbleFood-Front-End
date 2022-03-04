import axios from "axios";
export const GET_DETAIL_PRODUCT = "GET_DETAIL_PRODUCT";

export const getDetailProduct = (id) => {
  return async (dispatch) => {
    try {
      const detailProduct = await axios.get(
        `http://servidormongodb/Products/${id}`
      );
      dispatch({
        type: GET_DETAIL_PRODUCT,
        payload: detailProduct,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
