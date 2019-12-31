const initialState = { content: null, colour: 'white' }

const notificationReducer = (state = initialState, action) => {

	switch(action.type) {
		case 'NOTIFY': {
			const newMessage = { header: action.data.header, content: action.data.content, colour: action.data.colour, listing: action.data.listing }
			return newMessage
		}
		case 'SILENT':
			return { header: null, content: null, colour: 'white', listing: false }
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
			data: { header: message.header, content: message.content, colour: message.colour, listing: message.listing }
		})
		await new Promise(resolve => setTimeout(resolve, ms))
		dispatch({
			type: 'SILENT'
		})
	}
}

export default notificationReducer