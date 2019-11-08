import axios from 'axios'
const baseUrl = '/api/phrase'

const get = async () => {

	const response = await axios.get(baseUrl)
	return response.data
}

const change = async (newPhrase, token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = newPhrase
	const response = await axios.put(baseUrl, data, config)
	return response.data
}

export default { get, change }