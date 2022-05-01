import {SIGNUP_ERROR, SIGNUP_REQUEST, SIGNUP_SUCCESS} from "./signup.state";

const defaultState = {
	isLoading: false,
	data: null,
	error: null
}

const signupReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SIGNUP_REQUEST:
			return {
				...state,
				isLoading: true,
				data: null,
				error: null
			}
		case SIGNUP_SUCCESS:
			return {
				...state,
				data: action.payload,
				isLoading: false,
				error: null
			}
		case SIGNUP_ERROR:
			return {
				...state,
				data: null,
				isLoading: false,
				error: action.error
			}
		default: return state;
	}
}

export default signupReducer;