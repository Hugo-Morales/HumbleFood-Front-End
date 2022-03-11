import axios from "axios";
export const GET_DETAIL_PRODUCT = "GET_DETAIL_PRODUCT";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_PRODUCTS_SHOP = "GET_PRODUCTS_SHOP";
export const RESET = "RESET";
export const LOADING = "LOADING";
export const POST_REVIEW = "POST_REVIEW";
export const POST_PRODUCTS = "POST_PRODUCTS";
export const POST_NEW_SHOP = "POST_NEW_SHOP";
<<<<<<< HEAD
export const FILTER_BY_CATEGORIES = "FILTER_BY_CATEGORIES";
=======
export const POST_NEW_USER = "POST_NEW_USER";
export const GET_DATA_USER = "GET_DATA_USER";

export const postnewUser = (newUser) => {
  return async () => {
    try {
      const response = await axios.get(
        `https://back-end-prueba.herokuapp.com/user/${newUser.userId}`
      );
      // console.log(response.data.hasOwnProperty("user"));
      if (!response.data.hasOwnProperty("user")) {
        await axios.post("https://back-end-prueba.herokuapp.com/user", newUser);
        console.log('registrado')
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getdataUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://back-end-prueba.herokuapp.com/user/${id}`
      );
      dispatch({
        type: GET_DATA_USER,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
>>>>>>> d10c0428ea42a70b2c4671fd82020d3e0c833265

export const getallproducts = (page) => async (dispatch) => {
  try {
    const allproducts = await axios.get(
      `https://back-end-prueba.herokuapp.com/products?page=${page}`
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

export const getDetailProduct = (id) => async (dispatch) => {
  try {
    const detailProduct = await axios.get(
      `https://back-end-prueba.herokuapp.com/products?id=${id}`
    );
    dispatch({
      type: GET_DETAIL_PRODUCT,
      payload: detailProduct.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchByName = (nameoffood) => async (dispatch) => {
  try {
    const found_product = await axios.get(
      `https://back-end-prueba.herokuapp.com/products?name=${nameoffood}`
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
      await axios.post(`https://back-end-prueba.herokuapp.com/product`, input);
<<<<<<< HEAD
=======
      console.log("holaa");
>>>>>>> d10c0428ea42a70b2c4671fd82020d3e0c833265
    } catch (error) {
      console.log(error);
    }
  };
};
<<<<<<< HEAD
export const NewCategory = () => {
  return async () => {
    const name = prompt("save New Category ");
    await axios.post("https://back-end-prueba.herokuapp.com/category", {
      name,
    });
  };
};
=======
>>>>>>> d10c0428ea42a70b2c4671fd82020d3e0c833265

export const postNewShop = (newShop) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://back-end-prueba.herokuapp.com/shop",
      newShop
    );
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
    const categories = await axios.get(
      "https://back-end-prueba.herokuapp.com/categories"
    );
    dispatch({
      type: GET_CATEGORIES,
      payload: categories.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductShop = (id, page) => async (dispatch) => {
  try {
    const products = await axios.get(
      `https://back-end-prueba.herokuapp.com/productShop/${id}?page=${page}`
    );
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
//  - - - - POST/REVIEWS - - - -
export const postReview = (review) => async (dispatch) => {
  try {
    const response = await axios.post(
      "https://back-end-prueba.herokuapp.com/review",
      review
    );
    dispatch({
      type: POST_REVIEW,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export function filterProductsByCategories(payload) {
  return {
    type: FILTER_BY_CATEGORIES,
    payload,
  };
}

export const deleteProduct = (id) => async () => {
  try {
    await axios.delete(
      `https://back-end-prueba.herokuapp.com/product/delete/${id}`
    );
  } catch (error) {
    console.error(error);
  }
};
