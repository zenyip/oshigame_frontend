import usersService from '../services/users'

const displaynamesReducer = (state = [], action) => {
	switch(action.type) {
		case 'INIT_DISPLAYNAMES': {
			return action.data
		}
		default:
			return state
	}
}

export const initializeDisplaynames = () => {
	return async dispatch => {
		const displaynames = await usersService.getDisplaynames()
		dispatch({
			type: 'INIT_DISPLAYNAMES',
			data: displaynames
		})
	}
}

export default displaynamesReducer