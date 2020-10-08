const reducer = (state = [], action) => {
	switch (action.type) {
		case "NEW_USER":
			return state.concat(action.data)
		case "RESET_KEEP_AUTH":
			return state = []
		default:
			return state
	}
}

export default reducer
