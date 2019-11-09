import axios from 'axios'
const baseUrl = '/api/negotiations'

const getAll = async (token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}

	const response = await axios.get(baseUrl, config)
	return response.data
}

const getBids = async() => {
	const response = await axios.get(`${ baseUrl }/currentbids`)
	return response.data
}

const placeBid = async (newBid, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = newBid
	const response = await axios.post(baseUrl, data, config)
	return response.data
}

const settle = async (token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = null
	const response = await axios.post(`${ baseUrl }/settle`, data, config)
	return response.data
}

export default { getAll, placeBid, settle, getBids }