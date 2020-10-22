const reducer = (state = [], action) => {
	
	switch (action.type) {
		case "NEW_AD":
			return state.concat(action.data)
		case "RESET":
			return state = []
		default:
			return state
	}
}

export default reducer
