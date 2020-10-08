const reducer = (state = [], action) => {
	switch (action.type) {
		case "NEW_NEWS":
			return state.concat(action.data)
		case "UPDATE_NEWS":
			const id = action.data.id
			const updatedNews = state.find(item => item.id === id)
			const changedNews = {
				...updatedNews, ...action.data
			}
			return state.map(item =>
				item.id !== id ? item : changedNews
			)
		case "RESET_KEEP_AUTH":
			return state = []
		default:
			return state
	}
}

export default reducer
