import axios from 'axios'
const baseUrl = '/api/job'

const assignJob = async (memberId, assignment, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = {
		memberId,
		jobType: assignment
	}
	const response = await axios.post(`${ baseUrl }/assign`, data, config)
	return response.data
}

const cancelJob = async (memberId, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = {
		memberId,
	}
	const response = await axios.put(`${ baseUrl }/cancel`, data, config)
	return response.data
}

const collectJob = async (memberId, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = {
		memberId,
	}
	const response = await axios.put(`${ baseUrl }/collect`, data, config)
	return response.data
}

export default { assignJob, cancelJob, collectJob }