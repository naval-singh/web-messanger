import { auth, db } from './firebase.action';
import { authConstants } from './constants';


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
                    uid: data.user.uid,
                    isOnline: true
                }
                const currentUser = auth.currentUser
                const name = `${user.firstName} ${user.lastName}`
                currentUser.updateProfile({
                    displayName: name
                })
                    .then(() => {
                        // if you are here means it is updated successfully
                        const { email, ...rest } = loggedInUser
                        db.collection('users')
                            .doc(data.user.uid)
                            .set({
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
                    uid: data.user.uid,
                    isOnline: true
                }
                db.collection('users')
                    .doc(data.user.uid)
                    .update({
                        isOnline: true
                    })
                    .then(() => {
                        localStorage.setItem('user', JSON.stringify(loggedInUser))
                        dispatch({
                            type: authConstants.USER_LOGIN_SUCCESS,
                            payload: { user: loggedInUser }
                        })
                    })
                    .catch(error => {
                        console.log(error)
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
export const logout = (uid) => {
    return async dispatch => {

        dispatch({ type: authConstants.USER_LOGOUT_REQUEST })

        db.collection('users')
            .doc(uid)
            .update({
                isOnline: false
            })
            .then(() => {
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
            })
            .catch(error => {
                console.log(error)
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