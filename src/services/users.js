import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async (token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}

	const response = await axios.get(baseUrl, config)
	return response.data
}

const getByToken = async (token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}

	const response = await axios.get(`${ baseUrl }/byToken`, config)
	return response.data
}

const addUser = async (data) => {
	const response = await axios.post(baseUrl, data)
	return response.data
}

export default { getAll, getByToken, addUser }