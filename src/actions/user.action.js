import { auth, db } from './firebase.action';
import { userConstants } from "./constants";

export const getRealTimeUsers = (uid) => {
    return async dispatch => {

        dispatch({ type: userConstants.GET_REALTIME_USERS_REQUEST })
        const unsubscribe = db.collection("users")
            // .where("state", "==", "CA")
            .onSnapshot((querySnapshot) => {
                var users = [];
                querySnapshot.forEach((doc) => {
                    if (doc.data().uid != uid) {
                        users.push(doc.data());
                    }
                })
                dispatch({
                    type: userConstants.GET_REALTIME_USERS_SUCCESS,
                    payload: { users }
                })
            })
        return unsubscribe;
    }
}