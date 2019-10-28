import memberService from '../services/members'

const membersReducer = (state = [], action) => {

	switch(action.type) {
	case 'INIT_MEMBERS': {
		return action.data
	}
	default:
		return state
	}
}

export const initializeMembers = () => {
	return async dispatch => {
		const members = await memberService.getAll()
		dispatch({
			type: 'INIT_MEMBERS',
			data: members
		})
	}
}

export default membersReducer