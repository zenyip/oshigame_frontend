const remainTimeMSCal = (serverTime, endTime) => {
	const endTimeMS = Date.parse(endTime)
	const currentTimeMS = Date.parse(serverTime)
	const remainTimeMS = endTimeMS - currentTimeMS
	return remainTimeMS
}

const remainTimeText = (serverTime, endTime, compo) => {
	if (serverTime && endTime) {
		const remainTimeMS = remainTimeMSCal(serverTime, endTime)
		if (remainTimeMS > 0) {
			let remainTimeS = Math.floor(remainTimeMS / 1000)
			const remainHrs = Math.floor(remainTimeS / 3600)
			remainTimeS = remainTimeS % 3600
			const remainMins = Math.floor(remainTimeS / 60)
			const remainS = remainTimeS % 60
			if (compo === 'Member') {
				return `back in ${remainHrs} hr ${remainMins} min ${remainS} s`
			}
			if (compo === 'User') {
				return `will be back in ${remainHrs} hr ${remainMins} min ${remainS} s`
			}
			return `${remainHrs} hr ${remainMins} min ${remainS} s`
		} else {
			return 'is ready to collect'
		}
	}
	return null
}

const collectable = (serverTime, job) => {
	if (serverTime && job) {
		return remainTimeMSCal(serverTime, job.endTime) > 0 ? false : true
	} else {
		return false
	}
}

export default { remainTimeText, collectable }