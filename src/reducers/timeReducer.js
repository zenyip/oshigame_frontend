import timeService from '../services/time'

const timeReducer = (state = '', action) => {
	switch(action.type) {
		case 'GET_TIME': {
			return action.data
		}
		case 'ONE_TICK': {
			const newTime = new Date(Date.parse(state) + 1000)
			return newTime
		}
		default:
			return state
	}
}

export const getServerTime = () => {
	return async dispatch => {
		const serverTime = await timeService.get()
		dispatch({
			type: 'GET_TIME',
			data: serverTime
		})
	}
}

export const oneTick = () => {
	return async dispatch => {
		dispatch({
			type: 'ONE_TICK'
		})
	}
}

export default timeReducer