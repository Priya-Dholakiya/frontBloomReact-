import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../../config/firebase.config";

const authLoading = () => ({ type: "AUTH_LOADING" });
const authError = (message) => ({ type: "AUTH_ERROR", payload: message });
const authSuccess = (user) => ({ type: "LOGIN_SUCCESS", payload: user });
const authSignUp = () => ({ type: "SIGNUP_USER" });
const authLogout = () => ({ type: "LOGOUT" });

export const signInWithGoogle = () => {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      const res = await signInWithPopup(auth, provider);
      dispatch(authSuccess(res.user));
    } catch (error) {
      dispatch(authError(error.message));
    }
  };
};

export const signInWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch(authSuccess(res.user));
    } catch (error) {
      dispatch(authError(error.message));
    }
  };
};

export const registerWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(authSignUp());
      dispatch(authSuccess(res.user));
    } catch (error) {
      dispatch(authError(error.message));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      await signOut(auth);
      dispatch(authLogout());
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
        payload: error.message,
      });
    }
  };
};