import {
	CREATE_NOTE_FAILED,
	CREATE_NOTE_REQUEST,
	CREATE_NOTE_SUCCESS, DELETE_NOTE_FAILED, DELETE_NOTE_REQUEST, DELETE_NOTE_SUCCESS, RESET_NOTE, VIEW_NOTE_FAILED,
	VIEW_NOTE_REQUEST,
	VIEW_NOTE_SUCCESS
} from "./note.state";

const initalState = {
	isLoading: false,
	createSuccess: false,
	createFailed: false,
	viewSuccess: null,
	viewFailed: false,
	deleteSuccess: false,
	deleteFailed: false,
	data: [],
	error: []
}

const noteReducer = (state = initalState, action) => {
	switch (action.type) {
		case CREATE_NOTE_REQUEST:
			return {
				...state,
				isLoading: true,
				createSuccess: false,
				createFailed: false,
				viewSuccess: false,
				viewFailed: false,
				error: []
			}
		case CREATE_NOTE_SUCCESS:
			return {
				...state,
				isLoading: false,
				createSuccess: true,
				createFailed: false,
				viewSuccess: false,
				viewFailed: false,
				data: [...state.data, action.payload],
				error: []
			}
		case CREATE_NOTE_FAILED:
			return {
				...state,
				isLoading: false,
				createSuccess: false,
				createFailed: true,
				viewSuccess: false,
				viewFailed: false,
				data: [],
				error: action.error
			}
		case VIEW_NOTE_REQUEST:
			return {
				...state,
				isLoading: true,
				createSuccess: false,
				createFailed: false,
				viewSuccess: false,
				viewFailed: false,
				data: [],
				error: []
			}
		case VIEW_NOTE_SUCCESS:
			return {
				...state,
				isLoading: false,
				createSuccess: false,
				createFailed: false,
				viewSuccess: true,
				viewFailed: false,
				data: action.payload,
				error: []
			}
		case VIEW_NOTE_FAILED:
			return {
				...state,
				isLoading: false,
				createSuccess: false,
				createFailed: false,
				viewSuccess: false,
				viewFailed: true,
				data: [],
				error: action.error
			}
		case DELETE_NOTE_REQUEST:
			return {
				...state,
				isLoading: true,
				createSuccess: false,
				createFailed: false,
				viewSuccess: false,
				viewFailed: false,
				deleteSuccess: false,
				deleteFailed: false,
				error: []
			}
		case DELETE_NOTE_SUCCESS:
			return {
				...state,
				isLoading: false,
				createSuccess: false,
				createFailed: false,
				viewSuccess: false,
				viewFailed: false,
				deleteSuccess: true,
				deleteFailed: false,
				data: state.data.filter(note => note._id !== action.noteId),
				error: []
			}
		case DELETE_NOTE_FAILED:
			return {
				...state,
				isLoading: false,
				createSuccess: false,
				createFailed: false,
				viewSuccess: false,
				viewFailed: false,
				deleteSuccess: false,
				deleteFailed: true,
				data: [],
				error: action.error
			}
		case RESET_NOTE:
			return {
				...state,
				isLoading: false,
				createSuccess: false,
				createFailed: false,
				viewSuccess: false,
				viewFailed: false,
				deleteSuccess: false,
				deleteFailed: false,
			}
		default: return state;
	}
}

export default noteReducer;