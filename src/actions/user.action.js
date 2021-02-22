import { auth, db } from './firebase.action';
import { userConstants } from "./constants";

export const getRealTimeUsers = (uid) => {
    return async dispatch => {

        dispatch({ type: userConstants.GET_REALTIME_USERS_REQUEST })
        const unsubscribe = db.collection("users")
            // .where("state", "==", "CA")
            .onSnapshot((querySnapshot) => {
                const users = [];
                querySnapshot.forEach((doc) => {
                    if (doc.data().uid != uid) {
                        users.push(doc.data());
                    }
                })
                if (users.length > 0) {
                    dispatch({
                        type: userConstants.GET_REALTIME_USERS_SUCCESS,
                        payload: { users }
                    })
                } else {
                    dispatch({
                        type: userConstants.GET_REALTIME_USERS_FAILURE,
                        payload: { users }
                    })
                }
            })
        return unsubscribe;
    }
}

export const getRealTimeMessages = (user) => {
    return async dispatch => {

        dispatch({ type: userConstants.GET_REALTIME_MESSAGES_REQUEST })
        db.collection('conversations')
            .where('user_uid_1', 'in', [user.uid_1, user.uid_2])
            .orderBy('createdAt', 'asc')
            .onSnapshot((querySnapshot) => {
                const conversations = [];
                querySnapshot.forEach((doc) => {
                    if (
                        (doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2)
                        ||
                        (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1)
                    ) {
                        conversations.push(doc.data())
                    }
                })
                if (conversations.length > 0) {
                    dispatch({
                        type: userConstants.GET_REALTIME_MESSAGES_SUCCESS,
                        payload: { conversations }
                    })
                } else {
                    dispatch({
                        type: userConstants.GET_REALTIME_MESSAGES_FAILURE,
                        payload: { conversations }
                    })
                }
            })
    }
}

export const updateMessage = (messageObject) => {
    return async dispatch => {

        db.collection('conversations')
            .add({
                ...messageObject,
                isView: false,
                createdAt: new Date()
            })
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}