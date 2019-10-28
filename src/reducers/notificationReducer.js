const initialState = { content: null, colour: 'white' }

const notificationReducer = (state = initialState, action) => {

	switch(action.type) {
	case 'NOTIFY': {
		const newMessage = { content: action.data.content, colour: action.data.colour }
		return newMessage
	}
	case 'SILENT':
		return { content: null, colour: 'white' }
	default:
		return state
	}
}

export const setNotification = (message, time) => {
	return async dispatch => {
		const ms = time*1000
		dispatch({
			type: 'NOTIFY',
			data: { content: message.content, colour: message.colour }
		})
		await new Promise(resolve => setTimeout(resolve, ms))
		dispatch({
			type: 'SILENT'
		})
	}
}

export default notificationReducer