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
	let ms = 2000
	if (time === 'long') {
		ms = 3000
	}
	if (time === 'short') {
		ms = 1000
	}
	return async dispatch => {
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