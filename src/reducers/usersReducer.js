const reducer = (state = [], action) => {

	switch (action.type) {
		case "NEW_USER":
			return state.concat(action.data)
		case "UPDATE_USER":
			const id = action.data.id
			const updatedUser = state.find(item => item.id === id)
			const changedUser = {
				...updatedUser, ...action.data
			}
			return state.map(item =>
				item.id !== id ? item : changedUser
			)
		case "RESET":
			return state = []
		default:
			return state
	}
}

export default reducer
