import {
	CREATE_NOTE_FAILED,
	CREATE_NOTE_REQUEST,
	CREATE_NOTE_SUCCESS, DELETE_NOTE_FAILED, DELETE_NOTE_REQUEST, DELETE_NOTE_SUCCESS,
	VIEW_NOTE_FAILED, VIEW_NOTE_REQUEST,
	VIEW_NOTE_SUCCESS
} from "./note.state";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

const createNoteRequest = (formdata) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: CREATE_NOTE_REQUEST
			});

			const response = await axios({
				method: 'POST',
				url: '/notes',
				data: formdata
			});

			dispatch({
				type: CREATE_NOTE_SUCCESS,
				payload: response.data
			});
		} catch (e) {
			dispatch({
				type: CREATE_NOTE_FAILED,
				error: e.response
			});
		}
	}
}

const viewNoteRequest = (userId) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: VIEW_NOTE_REQUEST
			});

			const response = await axios({
				method: 'GET',
				url: `/notes/${userId}`
			});

			dispatch({
				type: VIEW_NOTE_SUCCESS,
				payload: response.data.notes
			});
		} catch (e) {
			dispatch({
				type: VIEW_NOTE_FAILED,
				error: e.response
			});
		}
	}
}

const deleteNoteRequest = (noteId) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: DELETE_NOTE_REQUEST
			});

			await axios({
				method: 'DELETE',
				url: `/notes/${noteId}`
			});

			dispatch({
				type: DELETE_NOTE_SUCCESS,
				noteId
			});
		} catch (e) {
			dispatch({
				type: DELETE_NOTE_FAILED,
				error: e.response
			});
		}
	}
}

export {
	createNoteRequest,
	viewNoteRequest,
	deleteNoteRequest
}