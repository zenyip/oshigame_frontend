import axios from 'axios'
const baseUrl = '/api/resetDB'

const resetDB = async (token) => {
	const config = {
		headers: { Authorization: `bearer ${token}` },
	}
	const data = null
	const response = await axios.post(baseUrl, data, config)
	return response.data
}

export default { resetDB }