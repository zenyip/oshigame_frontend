import memberService from '../services/members'

const membersReducer = (state = [], action) => {

	switch(action.type) {
	case 'INIT_MEMBERS': {
		return action.data
	}
	case 'ADD_MEMBER': {
		let newState = state.concat(action.data)
		return newState
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

export const addNewMember = (member, token) => {
	return async dispatch => {
		const addedMember = await memberService.addMember(member, token)
		dispatch({
			type: 'ADD_MEMBER',
			data: addedMember
		})
		return addedMember
	}
}

export default membersReducer