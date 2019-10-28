const newCpkeyReducer = (state = '', action) => {

	switch(action.type) {
	case 'CHANGE_NEWCPKEY': {
		return action.data
	}
	default:
		return state
	}
}

export const setNewCpkey = (newKey) => {
	return {
		type: 'CHANGE_NEWCPKEY',
		data: newKey
	}
}

export default newCpkeyReducer