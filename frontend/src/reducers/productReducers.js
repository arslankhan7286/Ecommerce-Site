import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCESS,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_SUCESS,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_SUCESS,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { Loading: true, products: [] };

    case PRODUCT_LIST_SUCESS:
      return {
        Loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };

    case PRODUCT_LIST_FAIL:
      return { Loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { products: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { Loading: true, ...state };

    case PRODUCT_DETAILS_SUCESS:
      return { Loading: false, products: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { Loading: false, error: action.payload };
    default:
      return state;
  }
};

/*product delete Reducer */

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { Loading: true };

    case PRODUCT_DELETE_SUCESS:
      return { Loading: false, success: true };

    case PRODUCT_DELETE_FAIL:
      return { Loading: false, error: action.payload };
    default:
      return state;
  }
};

/*product Create Reducer */

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { Loading: true };

    case PRODUCT_CREATE_SUCESS:
      return { Loading: false, success: true, product: action.payload };

    case PRODUCT_CREATE_RESET:
      return {};

    case PRODUCT_CREATE_FAIL:
      return { Loading: false, error: action.payload };
    default:
      return state;
  }
};

/*product Update Reducer */

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { Loading: true };

    case PRODUCT_UPDATE_SUCESS:
      return { Loading: false, success: true, product: action.payload };

    case PRODUCT_UPDATE_RESET:
      return { product: {} };

    case PRODUCT_UPDATE_FAIL:
      return { Loading: false, error: action.payload };
    default:
      return state;
  }
};

/*product Create reviw Reducer */

export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { Loading: true };

    case PRODUCT_CREATE_REVIEW_SUCESS:
      return { Loading: false, success: true };

    case PRODUCT_CREATE_REVIEW_RESET:
      return {};

    case PRODUCT_CREATE_REVIEW_FAIL:
      return { Loading: false, error: action.payload };
    default:
      return state;
  }
};
