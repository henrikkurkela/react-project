const reducer = (state = [], action) => {
	switch (action.type) {
		case "NEW_ITEM":
			return state.concat(action.data)
		default:
			return state
	}
}

export default reducer
