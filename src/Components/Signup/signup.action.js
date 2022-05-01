import {SIGNUP_ERROR, SIGNUP_REQUEST, SIGNUP_SUCCESS} from "./signup.state";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

const signupRequest = (formdata) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: SIGNUP_REQUEST
			})

			const {data} = await axios({
				method: "POST",
				url: '/signup',
				data: formdata
			});

			dispatch({
				type: SIGNUP_SUCCESS,
				payload: data
			});
		}
		catch (e) {
			dispatch({
				type: SIGNUP_ERROR,
				error: e.response.data.message
			});
		}
	}
}

export {
	signupRequest
}