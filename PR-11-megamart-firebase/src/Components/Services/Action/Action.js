import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase.config";
export const AddMenData = (data) => {
  return {
    type: "ADD_MEN_DATA",
    payload: data,
  };
};

export const getAllMenData = (data) => {
  return {
    type: "GET_ALL_MEN_DATA",
    payload: data,
  };
};

export const getAllkidsData = (data) => {
  return {
    type: "GET_ALL_MEN_DATA",
    payload: data,
  };
};

export const loading = () => {
  return {
    type: "LOADING",
  };
};
export const GetOneMenData = (id) => {
  return {
    type: "GET_ONE_MEN_DATA",
    payload: id,
  };
};
export const UpdateMenData = (data) => {
  return {
    type: "UPDATE_MEN_DATA",
    payload: data,
  };
};
export const filterData = (data) => {
  return {
    type: "FILTER_MEN_DATA",
    payload: data,
  };
};
export const AllRej = (msg) => {
  return {
    type: "Rej_ALL",
    message: msg,
  };
};
export const AddMenDataAsync = (data) => {
  return async (dispatch) => {
    try {
      await setDoc(doc(db, "megamart", `${data.id}`), data);
      dispatch(AddMenData());
    } catch (error) {
      dispatch(AllRej(error.message));
    }
    // axios.post("http://localhost:3000/Mens", data)
    //     .then(() => dispatch((AddMenData())))
    //     .catch(err => dispatch(AllRej(err.message)));
  };
};
export const GetAllMenAsync = () => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const res = await getDocs(collection(db, "megamart"));
      let result = [];
      res.forEach((doc) => {
        const data = doc.data();
        if (data.genderType === "men") {
          result.push(data);
        }
      });
      dispatch(getAllMenData(result));
    } catch (error) {
      dispatch(AllRej(error.message));
    }

    // axios.get("http://localhost:3000/Mens")
    //     .then((res) => dispatch(getAllMenData(res.data)))
    //     .catch(err => dispatch(AllRej(err.message)));
  };
};
export const DeleteMenDataAsync = (id) => {
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, "megamart", `${id}`));
      dispatch(GetAllMenAsync());
    } catch (error) {
      dispatch(AllRej(error.message));
    }
    // axios.delete(`http://localhost:3000/Mens/${id}`)
    //     .then(() => dispatch(GetAllMenAsync()))
    //     .catch(err => dispatch(AllRej(err.message)));
  };
};
export const GetOneMenDataAsync = (id) => {
  return async (dispatch) => {
    try {
      const res = await getDoc(doc(db, "megamart", `${id}`));
      if (res.exists()) {
        const data = res.data();
        data.id = res.id;                          // keep ID intact for editing
        dispatch(GetOneMenData(data));
      } else {
        dispatch(AllRej("Item not found"));
      }
    } catch (error) {
      dispatch(AllRej(error.message));
    }
    // axios.get(`http://localhost:3000/Mens/${id}`)
    //     .then((res) => dispatch(GetOneMenData(res.data)))
    //     .catch(err => dispatch(AllRej(err.message)));
  };
};
export const UpdateMenDataAsync = (data) => {
  return async (dispatch) => {
    try {
      await updateDoc(doc(db, "megamart", `${data.id}`), data);
      return Promise.resolve(); // Return success
    } catch (error) {
      dispatch(AllRej(error.message));
      return Promise.reject(error); // Return failure
    }
  };
};
export const GetAllWomenAsync = () => {
  return async (dispatch) => {
    try {
      const res = await getDocs(collection(db, "megamart"));
      let result = [];
      res.forEach((doc) => {
        const data = doc.data();
        if (data.genderType === "women") {
          result.push(data);
        }
      });
      dispatch(getAllMenData(result));
    } catch (error) {
      dispatch(AllRej(error.message));
    }
  };
};
export const DeleteWomenDataAsync = (id) => {
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, "megamart", `${id}`));
      dispatch(GetAllWomenAsync());
    } catch (error) {
      dispatch(AllRej(error.message));
    }
    // axios.delete(`http://localhost:3000/Mens/${id}`)
    //     .then(() => dispatch(GetAllMenAsync()))
    //     .catch(err => dispatch(AllRej(err.message)));
  };
};
export const GetAllKidsAsync = () => {
  return async (dispatch) => {
    try {
      const res = await getDocs(collection(db, "megamart"));
      let result = [];
      res.forEach((doc) => {
        const data = doc.data();
        if (data.genderType === "kids") {
          result.push(data);
        }
      });
      dispatch(getAllkidsData(result));
    } catch (error) {
      dispatch(AllRej(error.message));
    }
  };
};
export const DeleteKidsDataAsync = (id) => {
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, "megamart", `${id}`));
      dispatch(GetAllKidsAsync());
    } catch (error) {
      dispatch(AllRej(error.message));
    }
    // axios.delete(`http://localhost:3000/Mens/${id}`)
    //     .then(() => dispatch(GetAllMenAsync()))
    //     .catch(err => dispatch(AllRej(err.message)));
  };
};
