const initialState = { username: '', password: '' }

const loginInfoReducer = (state = initialState, action) => {

	switch(action.type) {
	case 'LOGIN_USERNAME': {
		const loginInfo = { username: action.data.username, password: state.password }
		return loginInfo
	}
	case 'LOGIN_PASSWORD': {
		const loginInfo = { username: state.username, password: action.data.password }
		return loginInfo
	}
	default:
		return state
	}
}

export const setUsername = (username) => {
	return {
		type: 'LOGIN_USERNAME',
		data: { username }
	}
}

export const setPassword = (password) => {
	return {
		type: 'LOGIN_PASSWORD',
		data: { password }
	}
}

export default loginInfoReducer