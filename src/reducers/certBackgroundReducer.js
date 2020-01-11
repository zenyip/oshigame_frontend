import certBackgroundService from '../services/certBackground'

const certBackgroundReducer = (state = '', action) => {
	switch(action.type) {
		case 'GET_CERTBACKGROUND': {
			return action.data
		}
		case 'CHANGE_CERTBACKGROUND': {
			return action.data
		}
		default:
			return state
	}
}

export const getCertBackground = () => {
	return async dispatch => {
		const imgLink = await certBackgroundService.get()
		dispatch({
			type: 'GET_CERTBACKGROUND',
			data: imgLink
		})
	}
}

export const changeCertBackground = (newImgLink, token) => {
	return async dispatch => {
		const updatedCertBackground = await certBackgroundService.change(newImgLink, token)
		dispatch({
			type: 'CHANGE_CERTBACKGROUND',
			data: updatedCertBackground.imgLink
		})
		return updatedCertBackground
	}
}

export default certBackgroundReducer