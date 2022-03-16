import axios from "axios";
export const GET_ORDER_BY_SHOP = "GET_ORDER_BY_SHOP";
const URL = process.env.REACT_APP_URL;

export const getOrderByShop = (shopId) => {
  return async (dispatch) => {
    try {
      const orderShop = await axios.get(`${URL}orders/${shopId}`);
      dispatch({
        type: GET_ORDER_BY_SHOP,
        payload: orderShop.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateOrderState = (orderId, state) => async () => {
  try {
    await axios.put(`${URL}order/${orderId}/${state}`);
  } catch (error) {
    console.log(error);
  }
};
