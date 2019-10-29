import cpkeysService from '../services/cpkeys'

const cpkeysReducer = (state = [], action) => {
	const sortByKey = (a, b) => {
		const keyA = a.key
		const keyB = b.key
		if (keyA < keyB) {
			return -1
		}
		if (keyB < keyA) {
			return 1
		}
		return 0
	}

	switch(action.type) {
	case 'ALL_KEYS': {
		const sortedKey = action.data.sort(sortByKey)
		return sortedKey
	}
	case 'ADD_KEY': {
		let newState = state.concat(action.data)
		return newState.sort(sortByKey)
	}
	default:
		return state
	}
}

export const allKeys = (token) => {
	return async dispatch => {
		const cpkeys = await cpkeysService.getAll(token)
		dispatch({
			type: 'ALL_KEYS',
			data: cpkeys
		})
	}
}

export const addNewKey = (key, token) => {
	return async dispatch => {
		const addedKey = await cpkeysService.addKey(key, token)
		dispatch({
			type: 'ADD_KEY',
			data: addedKey
		})
		return addedKey
	}
}

export default cpkeysReducer