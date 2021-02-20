import { authConstants } from "../actions/constants"

const initialState = {
    firstName: '',
    lastName: '',
    uid: '',
    email: '',
    authenticating: false,
    authenticated: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case authConstants.USER_LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true
            }
            break;
        case authConstants.USER_LOGIN_SUCCESS:
            state = {
                ...state,
                ...action.payload.user,
                authenticating: false,
                authenticated: true,
            }
            break;
        case authConstants.USER_LOGIN_REQUEST:
            state = {
                ...state,
                error: action.payload.error,
                authenticating: false
            }
    }
    return state;
}