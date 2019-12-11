import noticesService from '../services/notices'

const noticesReducer = (state = [], action) => {
	switch(action.type) {
		case 'ALL_NOTICES': {
			return action.data
		}
		case 'ADD_NOTICE': {
			const newState = state.concat(action.data)
			return newState
		}
		case 'UPDATE_NOTICE': {
			const newState = state.map(n => n.id.toString().includes(action.data.id) ? action.data : n)
			return newState
		}
		case 'REMOVE_NOTICE': {
			const newState = state.filter(n => !n.id.toString().includes(action.data))
			return newState
		}
		default:
			return state
	}
}

export const initializeNotices = () => {
	return async dispatch => {
		const notices = await noticesService.getAll()
		dispatch({
			type: 'ALL_NOTICES',
			data: notices
		})
	}
}

export const addNotice = (content, token) => {
	return async dispatch => {
		const addedNotice = await noticesService.create(content, token)
		dispatch({
			type: 'ADD_NOTICE',
			data: addedNotice
		})
		return addedNotice
	}
}

export const updateNotice = (id, content, token) => {
	return async dispatch => {
		const updatedNotice = await noticesService.update(id, content, token)
		dispatch({
			type: 'UPDATE_NOTICE',
			data: updatedNotice
		})
		return updatedNotice
	}
}

export const removeNotice = (id, token) => {
	return async dispatch => {
		const removedNotice = await noticesService.remove(id, token)
		dispatch({
			type: 'REMOVE_NOTICE',
			data: id
		})
		return removedNotice
	}
}

export default noticesReducer