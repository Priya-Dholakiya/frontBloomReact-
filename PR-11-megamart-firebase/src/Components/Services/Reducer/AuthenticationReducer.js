const intialstate = {
    errMsg: "",
    user: JSON.parse(localStorage.getItem('signinuser')) || null,
    iscreated: false
}

export const AuthReducer = (state = intialstate, action) => {
    switch (action.type) {
        case "ERROR_MSG":
            return {
                ...state,
                errMsg: action.payload,
                iscreated: false
            }
        case "SIGNUP_USER":
            return {
                ...state,
                iscreated: true
            }

        case "SIGNIN_USER":
            localStorage.setItem('signinuser', JSON.stringify(action.payload));
            return {
                ...state,
                user: action.payload,
                iscreated: false
            }
        case "SIGNOUT_USER":
            localStorage.removeItem("signinuser");
            return {
                ...state,
                user: null,
                iscreated: false
            }

        default:
            return state;
    }
}