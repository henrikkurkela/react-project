const reducer = (state = [], action) => {
	switch (action.type) {
		case "NEW_COMMENT":
			return state.concat(action.data)
		default:
			return state
	}
}

export default reducer
