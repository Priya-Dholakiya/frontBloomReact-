import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../../Service/config/firebase.config";
const errMsg = (msg) => {
  return {
    type: "ERROR_MSG",
    payload: msg,
  };
};
const signUpuser = () => {
  return {
    type: "SIGNUP_USER",
  };
};

const signInuser = (user) => {
  return {
    type: "SIGNIN_USER",
    payload: user,
  };
};
const signOutAsync = () => {
  return {
    type: "LOGOUT",
  };
};

export const CreateUserAsync = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log(res);
      dispatch(signUpuser());
    } catch (error) {
      console.log(error);
      dispatch(errMsg(error.message));
    }
  };
};

export const SignInAsync = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch(signInuser(res.user));
    } catch (error) {
      console.log(error);
      dispatch(errMsg(error.message));
    }
  };
};
export const signOutuserAsync = () => {
  return async (dispatch) => {
    try {
      dispatch(signOutAsync());
    } catch (error) {
      console.log(error);
      dispatch(errMsg(error.message));
    }
  };
};

export const SingInGoogleAsync = () => {
  return async (dispatch) => {
    try {
      const provider = new GoogleAuthProvider();
      let res = await signInWithPopup(auth, provider);
      dispatch(signInuser(res.user));
    } catch (error) {
      console.log(error);
      dispatch(errMsg(error.message));
    }
  };
};
