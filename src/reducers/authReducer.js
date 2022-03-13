import { SIGN_IN, SIGN_OUT } from "../actions/types";

const INTIAL_STATE = {
    isSignedIn: null,
    userId: null,
};

const authReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case SIGN_IN:
            // this syntax will override the object with same key
            return { ...state, isSignedIn: true, userId: action.payload };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null };
        default:
            return state;
    }
};

export default authReducer;
