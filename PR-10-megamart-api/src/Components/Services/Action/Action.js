import axios from 'axios';
export const AddMenData = (data) => {
    return {
        type: "ADD_MEN_DATA",
        payload: data
    }
}

export const getAllMenData = (data) => {
    return {
        type: "GET_ALL_MEN_DATA",
        payload: data
    }
}
export const GetOneMenData = (id) => {
    return {
        type: "GET_ONE_MEN_DATA",
        payload: id
    }
}
export const UpdateMenData = (data) => {
    return {
        type: "UPDATE_MEN_DATA",
        payload: data
    }
}
export const filterData = (data) => {
    return {
        type: "FILTER_MEN_DATA",
        payload: data
    }
}

export const AllRej = (msg) => {
    return {
        type: "Rej_ALL",
        message: msg
    }
}

export const AddMenDataAsync = (data) => {
    return (dispatch) => {
        axios.post("http://localhost:3000/Mens", data)
            .then(() => dispatch((AddMenData())))
            .catch(err => dispatch(AllRej(err.message)));
    }
}
export const GetAllMenAsync = () => {
    return (dispatch) => {
        axios.get("http://localhost:3000/Mens")
            .then((res) => dispatch(getAllMenData(res.data)))
            .catch(err => dispatch(AllRej(err.message)));
    }
}

export const DeleteMenDataAsync = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3000/Mens/${id}`)
            .then(() => dispatch(GetAllMenAsync()))
            .catch(err => dispatch(AllRej(err.message)));
    }
}

export const GetOneMenDataAsync = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:3000/Mens/${id}`)
            .then((res) => dispatch(GetOneMenData(res.data)))
            .catch(err => dispatch(AllRej(err.message)));
    }
}


export const UpdateMenDataAsync = (data) => {
    return (dispatch) => {
        axios.put(`http://localhost:3000/Mens/${data.id}`,data)
            .then((res) => dispatch(GetOneMenData(res.data)))
            .catch(err => dispatch(AllRej(err.message)));
    }
}



