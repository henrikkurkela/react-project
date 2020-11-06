const reducer = (state = null, action) => {
	
	switch (action.type) {
		case "NEW_MARKET":
			return state = action.data
		case "RESET":
			return state = null
		default:
			return state
	}
}

export default reducer
