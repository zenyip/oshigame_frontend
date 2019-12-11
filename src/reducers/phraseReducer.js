import phraseService from '../services/phrase'

const phraseReducer = (state = '', action) => {
	switch(action.type) {
		case 'GET_PHRASE': {
			return action.data
		}
		case 'CHANGE_PHRASE': {
			return action.data
		}
		default:
			return state
	}
}

export const checkPhrase = () => {
	return async dispatch => {
		const phrase = await phraseService.get()
		dispatch({
			type: 'GET_PHRASE',
			data: phrase[0].phrase
		})
	}
}

export const changePhrase = (newPhrase, token) => {
	return async dispatch => {
		const updatedPhrase = await phraseService.change(newPhrase, token)
		dispatch({
			type: 'CHANGE_PHRASE',
			data: updatedPhrase.phrase
		})
		return updatedPhrase
	}
}

export default phraseReducer