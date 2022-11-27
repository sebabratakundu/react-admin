import {
	INCORRECT_PASSWORD,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGOUT_FAILED,
	LOGOUT_SUCCESS,
	USERNAME_NOT_FOUND,
} from "./login.state";
import axios from "axios";
import Cookies from "universal-cookie";

axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

const loginRequest = (formdata) => {
  return async (dispatch) => {
	  try {
		  dispatch({
			  type: LOGIN_REQUEST
		  })

		  const response = await axios({
			  method: 'POST',
			  url: '/login',
			  data: formdata
		  });

		  dispatch({
			  type: LOGIN_SUCCESS,
			  payload: response.data
		  })
	  }
	  catch (e) {
		  if (e.response.status === 404) {
			  dispatch({
				  type: USERNAME_NOT_FOUND,
				  error: e.response.data.message
			  })
		  } else if (e.response.status === 401) {
			  dispatch({
				  type: INCORRECT_PASSWORD,
				  error: e.response.data.message
			  })
		  }
	  }
  }
}

const logoutRequest = () => {
	return async (dispatch) => {
		const cookie = new Cookies();
		const {userId} = JSON.parse(sessionStorage.getItem('userInfo'));

		try {
			await axios({
				method: 'GET',
				url: `/logout/${userId}`
			});

			cookie.remove('authToken');
			sessionStorage.clear();

			dispatch({
				type: LOGOUT_SUCCESS
			});
		}
		catch (e) {
			dispatch({
				type: LOGOUT_FAILED
			})
		}
	}
}

export {
	loginRequest,
	logoutRequest,
}