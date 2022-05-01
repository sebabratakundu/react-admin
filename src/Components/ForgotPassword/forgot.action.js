import {
	CODE_NOT_MATCHED,
	FORGOT_PASSWORD_FAILED,
	FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS,
	SEND_VERIFY_CODE_FAILED,
	SEND_VERIFY_CODE_REQUEST,
	SEND_VERIFY_CODE_SUCCESS, USER_NOT_FOUND
} from "./forgot.state";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

const sendVerifyCodeRequest = (email) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: SEND_VERIFY_CODE_REQUEST,
			});

			const response = await axios({
				method: 'POST',
				url: '/forgot-password',
				data: {
					email
				}
			});

			dispatch({
				type: SEND_VERIFY_CODE_SUCCESS,
				payload: response.data
			})
		}
		catch (e) {
			if (e.response.status === 404) {
				dispatch({
					type: USER_NOT_FOUND,
					error: e.response
				})
			} else if (e.response.status === 409) {
				dispatch({
					type: SEND_VERIFY_CODE_FAILED,
					error: e.response
				})
			}
		}
	}
}

const forgotPasswordRequest = (formData) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: FORGOT_PASSWORD_REQUEST
			});

			const response = await axios({
				method: 'PUT',
				url: '/forgot-password',
				data: formData
			});

			dispatch({
				type: FORGOT_PASSWORD_SUCCESS,
				payload: response.data
			})
		}
		catch (e) {
			if (e.response.status === 409) {
				dispatch({
					type: CODE_NOT_MATCHED,
					error: e.response
				});
			} else {
				dispatch({
					type: FORGOT_PASSWORD_FAILED,
					error: e.response
				});
			}
		}
	}
}
export {
	sendVerifyCodeRequest,
	forgotPasswordRequest
}