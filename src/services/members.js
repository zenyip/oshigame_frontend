import axios from 'axios'
const baseUrl = '/api/members'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const addMember = async (newMember, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = { newMember }
	const response = await axios.post(baseUrl, data, config)
	return response.data
}

const editMember = async (id, updateMember, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = { updateMember }
	const response = await axios.put(`${ baseUrl }/${ id }`, data, config)
	return response.data
}

export default { getAll, addMember, editMember }