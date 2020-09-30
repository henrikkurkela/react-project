const reducer = (state = [], action) => {
	switch (action.type) {
		case "NEW_COMMENT":
			return state.concat(action.data)
		case "REMOVE_COMMENT":
			return state.filter(item => item.id !== action.data.id)
		default:
			return state
	}
}

export default reducer