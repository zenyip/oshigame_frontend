import usersService from '../services/users'

const usersReducer = (state = [], action) => {
	const sortByUsername = (a, b) => {
		const usernameA = a.username
		const usernameB = b.username
		if (usernameA < usernameB) {
			return -1
		}
		if (usernameB < usernameA) {
			return 1
		}
		return 0
	}

	switch(action.type) {
	case 'ALL_USERS': {
		const sortedUser = action.data.sort(sortByUsername)
		return sortedUser
	}
	default:
		return state
	}
}

export const allUsers = (token) => {
	return async dispatch => {
		const users = await usersService.getAll(token)
		dispatch({
			type: 'ALL_USERS',
			data: users
		})
	}
}

export default usersReducer