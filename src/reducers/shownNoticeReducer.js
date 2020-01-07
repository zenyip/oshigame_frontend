const initialState = {
	switchOn: false,
	noMore: false
}

const shownNoticeReducer = (state = initialState, action) => {
	switch(action.type) {
		case 'NOMORE_NOTICE': {
			const newState = {
				switchOn: state.switchOn,
				noMore: true
			}
			return newState
		}
		case 'COMEBACK_NOTICE': {
			const newState = {
				switchOn: state.switchOn,
				noMore: false
			}
			return newState
		}
		case 'TURNON_NOTICE': {
			const newState = {
				switchOn: true,
				noMore: state.noMore
			}
			return newState
		}
		case 'TURNOFF_NOTICE': {
			const newState = {
				switchOn: false,
				noMore: state.noMore
			}
			return newState
		}
		default:
			return state
	}
}

export const noMoreNoticeOn = () => {
	return dispatch => {
		dispatch({
			type: 'NOMORE_NOTICE'
		})
	}
}

export const noMoreNoticeOff = () => {
	return dispatch => {
		dispatch({
			type: 'COMEBACK_NOTICE'
		})
	}
}

export const turnOnNotice = () => {
	return dispatch => {
		dispatch({
			type: 'TURNON_NOTICE'
		})
	}
}

export const turnOffNotice = () => {
	return dispatch => {
		dispatch({
			type: 'TURNOFF_NOTICE'
		})
	}
}


export default shownNoticeReducer