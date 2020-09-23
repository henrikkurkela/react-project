const reducer = (state = [], action) => {
	switch (action.type) {
		case "NEW_NEWS":
			return state.concat(action.data)
		case "LIKE_NEWS":
			const id = action.data.id
			const likedNews = state.find(item => item.id === id)
			const changedLikes = {
				...likedNews,
				likes: action.data.like ? likedNews.likes + 1 : likedNews.likes - 1
			}
			return state.map(item =>
				item.id !== id ? item : changedLikes
			)
		default:
			return state
	}
}

export default reducer
