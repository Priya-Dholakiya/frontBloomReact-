// redux/reducers/AuthReducer.js

const initialState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isError: null,
  isCreated: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_LOADING":
      return {
        ...state,
        isLoading: true,
        isError: null,
      };

    case "SIGNIN_USER":
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuth: true,
        isLoading: false,
      };

    case "SIGNUP_USER":
      return {
        ...state,
        isCreated: true,
        isLoading: false,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: false,
      };

    case "AUTH_ERROR":
      return {
        ...state,
        isError: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
