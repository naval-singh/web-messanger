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