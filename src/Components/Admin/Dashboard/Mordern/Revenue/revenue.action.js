import axios from "axios";
import {REVENUE_REQUEST, REVENUE_REQUEST_FAILED, REVENUE_REQUEST_SUCCESS} from "./revenue.state";

axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

const revenueRequest = () => {
	return async (dispatch) => {
		try {
			dispatch({
				type: REVENUE_REQUEST
			});

			const response = await axios({
				method: 'GET',
				url: '/revenue-updates'
			});

			dispatch({
				type: REVENUE_REQUEST_SUCCESS,
				payload: response.data
			});
		}
		catch (e) {
			dispatch({
				type: REVENUE_REQUEST_FAILED,
				error: e.response
			});
		}
	}
}

export {
	revenueRequest
}