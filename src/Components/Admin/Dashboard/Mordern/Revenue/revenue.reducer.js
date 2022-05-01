import {REVENUE_REQUEST, REVENUE_REQUEST_FAILED, REVENUE_REQUEST_SUCCESS} from "./revenue.state";

const Model = {
	isLoading: null,
	success: false,
	failed: false,
	data: [],
	error: []
}

const revenueReducer = (state = Model, action) => {
	switch (action.type) {
		case REVENUE_REQUEST:
			return {
				...state,
				isLoading: true,
				success: false,
				failed: false,
				data: [],
				error: []
			}
		case REVENUE_REQUEST_SUCCESS:
			return {
				...state,
				isLoading: false,
				success: true,
				failed: false,
				data: action.payload,
				error: []
			}
		case REVENUE_REQUEST_FAILED:
			return {
				...state,
				isLoading: false,
				success: false,
				failed: true,
				data: [],
				error: action.error
			}
		default: return state;
	}
}

export default revenueReducer;