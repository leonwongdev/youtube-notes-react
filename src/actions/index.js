import streams from "../apis/streams";
import history from "../history";
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
} from "./types";

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId,
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};

export const createStream = (formValues) => async (dispatch, getState) => {
    const { userId } = getState().auth;
    const response = await streams.post("/notes", { ...formValues, userId });
    console.log("createStream action response: ", response.data);
    dispatch({ type: CREATE_STREAM, payload: response.data });
    history.push("/");
};

export const fetchStreams = () => async (dispatch) => {
    try {
        const response = await streams.get("/notes");
        // console.log("fetchStreams response", response);
        dispatch({ type: FETCH_STREAMS, payload: response.data });
    } catch (error) {
        alert(error + " Fail to fetch a list of streams.");
    }
};

export const fetchStream = (id) => async (dispatch) => {
    const response = await streams.get(`/notes/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues, callback) => async (dispatch) => {
    // console.log("editStream action: ", formValues);
    const response = await streams.put(`/notes/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
    callback();
    // history.push("/");
};

export const deleteStream = (id) => async (dispatch) => {
    await streams.delete(`/notes/${id}`);

    //use loadash to delete object array with id
    dispatch({ type: DELETE_STREAM, payload: id });
    history.push("/");
};
