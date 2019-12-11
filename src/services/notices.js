import axios from 'axios'
const baseUrl = '/api/notices'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (content, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = { content }
	const response = await axios.post(baseUrl, data, config)
	return response.data
}

const remove = async (id, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const response = await axios.delete(`${ baseUrl }/${ id }`, config)
	return response.data
}

const update = async (id, content, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = { content }
	const response = await axios.put(`${ baseUrl }/${ id }`, data, config)
	return response.data
}

export default { getAll, create, remove, update }