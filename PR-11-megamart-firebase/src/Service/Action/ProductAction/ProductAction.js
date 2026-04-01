// redux/actions/productAction.js
import {db} from '../../config/firebase.config'
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";


// 🔹 ACTION CREATORS (simple string)

export const productLoading = () => ({
  type: "PRODUCT_LOADING",
});

export const productError = (error) => ({
  type: "PRODUCT_ERROR",
  payload: error,
});

export const getProductsSuccess = (data) => ({
  type: "GET_PRODUCTS",
  payload: data,
});

export const getSingleProductSuccess = (data) => ({
  type: "GET_SINGLE_PRODUCT",
  payload: data,
});

export const addProductSuccess = (data) => ({
  type: "ADD_PRODUCT",
  payload: data,
});

export const deleteProductSuccess = (id) => ({
  type: "DELETE_PRODUCT",
  payload: id,
});

export const updateProductSuccess = (data) => ({
  type: "UPDATE_PRODUCT",
  payload: data,
});

export const getProducts = () => {
  return async (dispatch) => {
    dispatch(productLoading());

    try {
      const snapshot = await getDocs(collection(db, "products"));

      let data = [];
      snapshot.forEach((item) => {
        data.push({ id: item.id, ...item.data() });
      });

      dispatch(getProductsSuccess(data));

    } catch (error) {
      dispatch(productError(error.message));
    }
  };
};

export const getSingleProduct = (id) => {
  return async (dispatch) => {
    dispatch(productLoading());

    try {
      const snap = await getDoc(doc(db, "products", id));

      if (snap.exists()) {
        dispatch(
          getSingleProductSuccess({
            id: snap.id,
            ...snap.data(),
          })
        );
      }

    } catch (error) {
      dispatch(productError(error.message));
    }
  };
};


export const addProduct = (product) => {
  return async (dispatch) => {
    dispatch(productLoading());

    try {
      let finalProduct;

      if (product.id) {
        // Use provided ID (from Add form) to keep ID consistent
        await setDoc(doc(db, "products", product.id), product);
        finalProduct = product;
      } else {
        const res = await addDoc(collection(db, "products"), product);
        finalProduct = { id: res.id, ...product };
      }

      dispatch(addProductSuccess(finalProduct));

    } catch (error) {
      dispatch(productError(error.message));
      throw error;
    }
  };
};


export const deleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(productLoading());

    try {
      await deleteDoc(doc(db, "products", id));

      dispatch(deleteProductSuccess(id));

    } catch (error) {
      dispatch(productError(error.message));
    }
  };
};

export const updateProduct = (id, updatedData) => {
  return async (dispatch) => {
    dispatch(productLoading());

    try {
      await updateDoc(doc(db, "products", id), updatedData);

      dispatch(
        updateProductSuccess({
          id,
          ...updatedData,
        })
      );

    } catch (error) {
      dispatch(productError(error.message));
    }
  };
};