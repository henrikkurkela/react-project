const reducer = (state = null, action) => {
	switch (action.type) {
		case "LOGIN":
            return state = action.data
        case "LOGOUT":
            return state = null
		default:
			return state
	}
}

export default reducer
