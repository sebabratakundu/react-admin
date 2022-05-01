import {
	CODE_NOT_MATCHED,
	FORGOT_PASSWORD_FAILED,
	FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
	SEND_VERIFY_CODE_FAILED,
	SEND_VERIFY_CODE_REQUEST,
	SEND_VERIFY_CODE_SUCCESS, USER_NOT_FOUND
} from "./forgot.state";

const Model = {
	isLoading: false,
	emailSent: false,
	error: null,
	userNotFound: false,
	codeNotMatched: false,
	passwordChanged: false,
	data: []
}

const forgotReducer = (state = Model, action) => {
	switch (action.type) {
		case SEND_VERIFY_CODE_REQUEST:
			return {
				...state,
				isLoading: true,
				emailSent: false,
				error: null,
				data: [],
			}
		case SEND_VERIFY_CODE_SUCCESS:
			return {
				...state,
				isLoading: false,
				emailSent: true,
				userNotFound: false,
				codeNotMatched: false,
				error: null,
				data: action.payload,
			}
		case SEND_VERIFY_CODE_FAILED:
			return {
				...state,
				isLoading: false,
				emailSent: false,
				userNotFound: false,
				codeNotMatched: false,
				data: [],
				error: action.error
			}
		case USER_NOT_FOUND:
			return {
				...state,
				isLoading: false,
				emailSent: false,
				userNotFound: true,
				codeNotMatched: false,
				data: [],
				error: action.error
			}
		case FORGOT_PASSWORD_REQUEST:
			return {
				...state,
				isLoading: true,
				emailSent: false,
				userNotFound: false,
				codeNotMatched: false,
				passwordChanged: false,
				data: [],
				error: null
			}
		case FORGOT_PASSWORD_SUCCESS:
			return {
				...state,
				isLoading: false,
				emailSent: true,
				userNotFound: false,
				codeNotMatched: false,
				passwordChanged: true,
				data: action.payload,
				error: null
			}
		case FORGOT_PASSWORD_FAILED:
			return {
				...state,
				isLoading: false,
				emailSent: false,
				userNotFound: false,
				codeNotMatched: false,
				passwordChanged: false,
				data: [],
				error: action.error
			}
		case CODE_NOT_MATCHED:
			return {
				...state,
				isLoading: false,
				emailSent: false,
				userNotFound: false,
				codeNotMatched: true,
				passwordChanged: false,
				data: null,
				error: action.error
			}
		default: return state;
	}
}

export default forgotReducer;