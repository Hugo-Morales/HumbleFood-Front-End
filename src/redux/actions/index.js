import axios from "axios";
export const GET_SHOPS = "GET_SHOPS";
export const GET_DETAIL_PRODUCT = "GET_DETAIL_PRODUCT";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_PRODUCTS_SHOP = "GET_PRODUCTS_SHOP";
export const RESET = "RESET";
export const LOADING = "LOADING";
export const POST_REVIEW = "POST_REVIEW";
export const POST_PRODUCTS = "POST_PRODUCTS";
export const FILTER_BY_CATEGORIES = "FILTER_BY_CATEGORIES";
export const FILTER_BY_DISCOUNT = "FILTER_BY_DISCOUNT";
export const POST_NEW_SHOP = "POST_NEW_SHOP";
export const POST_NEW_USER = "POST_NEW_USER";
export const GET_DATA_USER = "GET_DATA_USER";
export const GET_SHOPS_ID = "GET_SHOPS_ID";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const LOADING_PANEL = "LOADING_PANEL";
export const GET_NAME_OF_SHOP = "GET_NAME_OF_SHOP";
export const GET_DISCOUNTS = "GET_DISCOUNTS";
export const POST_ORDER = "POST_ORDER";

export const STOP = "STOP";
const URL = process.env.REACT_APP_URL;

export const getShopsId = (id) => async (dispatch) => {
  try {
    const allShopsId = await axios.get(`${URL}shop/${id}`);
    dispatch({
      type: GET_SHOPS_ID,
      payload: allShopsId.data.shop,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getShops = (page) => async (dispatch) => {
  try {
    const allShops = await axios.get(`${URL}shops?page=${page}`);
    dispatch({
      type: GET_SHOPS,
      payload: allShops.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postnewUser = (newUser) => {
  return async () => {
    try {
      const response = await axios.get(`${URL}user/${newUser.userId}`);
      // console.log(response.data.hasOwnProperty("user"));
      if (!response.data.hasOwnProperty("user")) {
        await axios.post(`${URL}user`, newUser);
        console.log("registrado");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getdataUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}user/${id}`);
      dispatch({
        type: GET_DATA_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getallproducts = (page) => async (dispatch) => {
  try {
    const allproducts = await axios.get(`${URL}products?page=${page}`);
    // console.log(allproducts);

    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: allproducts.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDetailProduct = (idShop, idProduct) => async (dispatch) => {
  try {
    const detailProduct = await axios.get(
      `${URL}productShop/${idShop}?id=${idProduct}`
    );
    dispatch({
      type: GET_DETAIL_PRODUCT,
      payload: detailProduct.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchByName = (shopId, nameoffood) => async (dispatch) => {
  try {
    const found_product = await axios.get(
      `${URL}productShop/${shopId}?name=${nameoffood}`
    );
    dispatch({
      type: SEARCH_BY_NAME,
      payload: found_product.data,
    });
    // console.log(found_product.data);
  } catch (error) {
    console.log(error);
  }
};

export const postproducts = (input) => {
  return async () => {
    try {
      await axios.post(`${URL}product`, input);
      console.log("holaa");
    } catch (error) {
      console.log(error);
    }
  };
};
export const NewCategory = () => {
  return async () => {
    const name = prompt("save New Category ");
    await axios.post(`${URL}category`, {
      name,
    });
  };
};

export const postNewShop = (newShop) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}shop`, newShop);
    console.log(response);
    dispatch({
      type: POST_NEW_SHOP,
      payload: response.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const categories = await axios.get(`${URL}categories`);
    dispatch({
      type: GET_CATEGORIES,
      payload: categories.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getDiscounts = (id) => async (dispatch) => {
  try {
    const discounts = await axios.get(`${URL}productShop/${id}/discounts`);
    // console.log(discounts.data, "DISCOUNTS");
    dispatch({
      type: GET_DISCOUNTS,
      payload: discounts.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const filterProductsByDiscounts =
  (shopId, discount) => async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL}productShop/${shopId}?discount=${discount}`
      );
      dispatch({
        type: FILTER_BY_DISCOUNT,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const getProductShop = (id, page) => async (dispatch) => {
  try {
    const products = await axios.get(`${URL}productShop/${id}?page=${page}`);
    dispatch({
      type: GET_PRODUCTS_SHOP,
      payload: products.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const reset = () => (dispatch) => {
  dispatch({
    type: RESET,
  });
};

export const loading = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
};
export const loading_panel = () => (dispatch) => {
  dispatch({
    type: LOADING_PANEL,
  });
};

export const stop = () => (dispatch) => {
  dispatch({
    type: STOP,
  });
};

//  - - - - POST/REVIEWS - - - -
export const postReview = (review) => async (dispatch) => {
  try {
    const response = await axios.post(`${URL}review`, review);
    dispatch({
      type: POST_REVIEW,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const filterProductsByCategories =
  (shopId, category) => async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL}productShop/${shopId}?category=${category}`
      );
      dispatch({
        type: FILTER_BY_CATEGORIES,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const deleteProduct = (id) => async () => {
  try {
    await axios.delete(`${URL}product/delete/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const getAllUser = (page) => async (dispatch) => {
  try {
    const products = await axios.get(`${URL}users?page=${page}`);

    dispatch({
      type: GET_ALL_USERS,
      payload: products.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const banU = (type, id) => async () => {
  try {
    axios.put(`${URL}user/alter/${type}/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const banS = (type, id) => async () => {
  try {
    axios.put(`${URL}shop/alter/${type}/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const admin = (type, id) => async () => {
  try {
    axios.put(`${URL}user/${type}/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const editProduct = (obj) => async () => {
  try {
    axios.put(`${URL}product/update`, obj);
  } catch (error) {
    console.error(error);
  }
};

export const getnameOfShop = (id) => {
  return async (dispatch) => {
    try {
      const nameShop = await axios.get(`${URL}shop/${id}`);
      console.log(nameShop.data.shop.name);
      dispatch({
        type: GET_NAME_OF_SHOP,
        payload: nameShop.data.shop.name,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postOrder = (order) => async(dispatch) => {
  try {
    const response = await axios.post(`{URL}order`, order);
    dispatch({
      type: POST_ORDER,
      payload: response.data,
    })
  } catch (error) {
    
  }
}
