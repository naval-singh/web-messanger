import firebase from 'firebase';
import { authConstants } from './constants';

const firebaseConfig = {
    apiKey: "AIzaSyDDSBY8wLxwi_CGzRe7yBi2dGyz7nO9wMs",
    authDomain: "web-messanger-9754a.firebaseapp.com",
    projectId: "web-messanger-9754a",
    storageBucket: "web-messanger-9754a.appspot.com",
    messagingSenderId: "510102322883",
    appId: "1:510102322883:web:c86b37a21c5ab29dc9ac76"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


// SIGNUP ACTION
export const signup = user => {
    return async dispatch => {

        dispatch({ type: authConstants.USER_LOGIN_REQUEST })
        auth.createUserWithEmailAndPassword(user.email, user.password)
            .then(data => {
                console.log(data)
                const loggedInUser = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    uid: data.user.uid
                }
                const currentUser = auth.currentUser
                const name = `${user.firstName} ${user.lastName}`
                currentUser.updateProfile({
                    displayName: name
                })
                    .then(() => {
                        // if you are here means it is updated successfully
                        const { email, ...rest } = loggedInUser
                        db.collection('users').add({
                            ...rest,
                            createdAt: new Date()
                        })
                            .then(() => {
                                //successful
                                localStorage.setItem('user', JSON.stringify(loggedInUser))
                                console.log('User logged in successfully...!!')
                                dispatch({
                                    type: authConstants.USER_LOGIN_SUCCESS,
                                    payload: { user: loggedInUser }
                                })
                            })
                            .catch(error => {
                                console.log(error)
                                dispatch({
                                    type: authConstants.USER_LOGIN_FAILURE,
                                    payload: { error }
                                })
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
}


// SIGNIN ACTION
export const signin = user => {
    return async dispatch => {

        dispatch({ type: authConstants.USER_LOGIN_REQUEST })
        auth.signInWithEmailAndPassword(user.email, user.password)
            .then(data => {
                console.log(data)
                const name = data.user.displayName.split(' ')
                const loggedInUser = {
                    firstName: name[0],
                    lastName: name[1],
                    email: data.user.email,
                    uid: data.user.uid
                }
                localStorage.setItem('user', JSON.stringify(loggedInUser))
                dispatch({
                    type: authConstants.USER_LOGIN_SUCCESS,
                    payload: { user: loggedInUser }
                })
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: authConstants.USER_LOGIN_FAILURE,
                    payload: { error }
                })
            })
    }
}


// SIGNOUT ACTION
export const logout = () => {
    return async dispatch => {

        dispatch({ type: authConstants.USER_LOGOUT_REQUEST })
        auth.signOut()
            .then(() => {
                localStorage.clear()
                dispatch({ type: authConstants.USER_LOGOUT_SUCCESS })
            })
            .catch(error => {
                console.log(error)
                dispatch({
                    type: authConstants.USER_LOGOUT_FAILURE,
                    payload: { error }
                })
            })
    }
}


// CHECK LOGGED IN USER
export const isUserLoggedIn = () => {
    return async dispatch => {

        dispatch({ type: authConstants.USER_LOGIN_REQUEST })
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
        if (user) {
            dispatch({
                type: authConstants.USER_LOGIN_SUCCESS,
                payload: { user }
            })
        } else {
            dispatch({
                type: authConstants.USER_LOGIN_FAILURE,
                payload: { error: 'Login Again...' }
            })
        }
    }
}