import axios from 'axios'
const baseUrl = '/api/certBackground'

const get = async () => {

	const response = await axios.get(baseUrl)
	return response.data
}

const change = async (newImgLink, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = { newImgLink }
	const response = await axios.put(baseUrl, data, config)
	return response.data
}

export default { get, change }