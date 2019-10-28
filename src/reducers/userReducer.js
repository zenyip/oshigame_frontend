import loginService from '../services/login'
import userService from '../services/users'

const userReducer = (state = null, action) => {

	switch(action.type) {
	case 'SET_USER': {
		return action.data
	}
	case 'SET_USER_BY_TOKEN': {
		return action.data
	}
	case 'USER_LOGIN': {
		return action.data
	}
	default:
		return state
	}
}

export const setUser = (user) => {
	return async dispatch => {
		dispatch({
			type: 'SET_USER',
			data: user 
		})
		return user
	}
}

export const setUserByToken = (token) => {
	return async dispatch => {
		const user = await userService.getByToken(token)
		dispatch({
			type: 'SET_USER_BY_TOKEN',
			data: user
		})
		return user
	}
}

export const userLogin = (loginInfo) => {
	const username = loginInfo.username
	const password = loginInfo.password
	return async dispatch => {
		const data = await loginService.login({ username, password })
		dispatch({
			type: 'USER_LOGIN',
			data
		})
		return data
	}
}

export default userReducer