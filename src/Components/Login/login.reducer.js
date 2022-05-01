import {
	INCORRECT_PASSWORD,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_FAILED,
	LOGOUT_SUCCESS,
	USERNAME_NOT_FOUND, VERIFY_TOKEN_FAILED, VERIFY_TOKEN_SUCCESS
} from "./login.state";

const model = {
	isLoading: false,
	isUserNotFound: false,
	isIncorrectPassword: false,
	isLoggedIn: false,
	isLoggedOut: false,
	data: [],
	error: null
}

const loginReducer = (state = model, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...state,
				isLoading: true,
				isUserNotFound: false,
				isIncorrectPassword: false,
				isLoggedIn: false,
				data: [],
				error: null
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoading: false,
				isUserNotFound: false,
				isIncorrectPassword: false,
				isLoggedIn: true,
				isLoggedOut: false,
				data: action.payload,
			}
		case USERNAME_NOT_FOUND:
			return {
				...state,
				isLoading: false,
				isUserNotFound: true,
				isIncorrectPassword: false,
				isLoggedIn: false,
				isLoggedOut: true,
				data: [],
				error: action.error
			}
		case INCORRECT_PASSWORD:
			return {
				...state,
				isLoading: false,
				isUserNotFound: false,
				isIncorrectPassword: true,
				isLoggedIn: false,
				isLoggedOut: true,
				data: [],
				error: action.error
			}
		case LOGOUT_SUCCESS:
			return {
				...state,
				isLoading: false,
				isUserNotFound: false,
				isIncorrectPassword: false,
				isLoggedIn: false,
				isLoggedOut: true,
				data: [],
				error: []
			}
		case LOGOUT_FAILED:
			return {
				...state,
				isLoading: false,
				isUserNotFound: false,
				isIncorrectPassword: false,
				isLoggedIn: true,
				isLoggedOut: false
			}
		case VERIFY_TOKEN_SUCCESS:
			return {
				...state,
				isLoading: false,
				isUserNotFound: false,
				isIncorrectPassword: false,
				isLoggedIn: true,
				data: action.payload
			}
		case VERIFY_TOKEN_FAILED:
			return {
				...state,
				isLoading: false,
				isUserNotFound: false,
				isIncorrectPassword: false,
				isLoggedIn: false,
				data: []
			}
		default: return state;
	}
}

export default loginReducer;