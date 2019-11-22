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

const sendOffer = async (newOffer, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = newOffer
	const response = await axios.post(baseUrl, data, config)
	return response.data
}

const acceptOffer = async (negotiationId, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = { negotiationId }
	const response = await axios.post(`${ baseUrl }/accept`, data, config)
	return response.data
}

const rejectOffer = async (negotiationId, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = { negotiationId }
	const response = await axios.post(`${ baseUrl }/reject`, data, config)
	return response.data
}

const applyForceTrade = async (newForceTrade, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = newForceTrade
	const response = await axios.post(baseUrl, data, config)
	return response.data
}

const releaseMember = async (newRelease, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = newRelease
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

export default { getAll, getBids, settle, placeBid, sendOffer, acceptOffer, rejectOffer, applyForceTrade, releaseMember }