const reducer = (state = null, action) => {
	
	switch (action.type) {
		case 'LOGIN':
			return state = action.data
		case 'UPDATE_AUTH':
			return state = { ...state, ...action.data }
        case 'LOGOUT':
		case 'RESET':
            return state = null
		default:
			return state
	}
}

export default reducer
