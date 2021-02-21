import { userConstants } from "../actions/constants"

const initialState = {
    users: [],
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case userConstants.GET_REALTIME_USERS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.GET_REALTIME_USERS_SUCCESS:
            state = {
                ...state,
                loading: false,
                users: action.payload.users
            }
            break;
        case userConstants.GET_REALTIME_USERS_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;
    }
    return state;
}