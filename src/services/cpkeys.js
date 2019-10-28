import axios from 'axios'
const baseUrl = '/api/cpkeys'

const getAll = async (token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}

	const response = await axios.get(baseUrl, config)
	return response.data
}

const addKey = async (key, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = { key }
	const response = await axios.post(baseUrl, data, config)
	return response.data
}

export default { getAll, addKey }