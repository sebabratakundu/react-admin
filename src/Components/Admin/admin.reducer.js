const Model = {
	dark: false
}

const adminReducer = (state = Model, action) => {
	switch (action.type) {
		case 'light':
			return {
				...state,
				dark: false
			}
		case 'dark':
			return {
				...state,
				dark: true
			}
		default: return state;
	}
}

export default adminReducer;