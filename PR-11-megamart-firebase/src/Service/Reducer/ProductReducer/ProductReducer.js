const initialState = {
  products: [],
  product: null,   
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {

    case "PRODUCT_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };

    
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
        loading: false,
      };

   
    case "GET_SINGLE_PRODUCT":
      return {
        ...state,
        product: action.payload,
        loading: false,
      };

    case "ADD_PRODUCT":
      return {
        ...state,
        products: [...state.products, action.payload],
        loading: false,
      };

   
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter(
          (item) => item.id !== action.payload
        ),
        loading: false,
      };

   
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload }
            : item
        ),
        loading: false,
      };

   case "CLEAR_PRODUCT":
      return {
        ...state,
        product: null,
      };

    case "PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
 case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default productReducer;