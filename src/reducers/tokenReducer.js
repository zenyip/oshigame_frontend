const tokenReducer = (state = null, action) => {

	switch(action.type) {
	case 'TOKEN_CHANGE': {
		return action.data
	}
	case 'TOKEN_CLEAR': {
		return null
	}
	default:
		return state
	}
}

export const setToken = (newToken) => {
	return {
		type: 'TOKEN_CHANGE',
		data: newToken
	}
}

export const clearToken = () => {
	return {
		type: 'TOKEN_CLEAR'
	}
}

export default tokenReducer