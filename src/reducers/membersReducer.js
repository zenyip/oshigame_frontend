import memberService from '../services/members'

const membersReducer = (state = [], action) => {

	const sortFunctionByGen = (a, b) => {
		const genA = a.generation.sortValue
		const genB = b.generation.sortValue
		return genA - genB
	}

	const sortFunctionByTeam = (x, y) => {
		const teamList = ['Team A', 'Team K', 'Team B', 'Team 4', 'Team 8']
		let teamX = teamList.indexOf(x.team[0])
		let teamY = teamList.indexOf(y.team[0])
		return teamX - teamY	
	}

	const sortFunctionByFirstname_e = (a, b) => {
		const nameA = a.name_e.firstname
		const nameB = b.name_e.firstname
		if (nameA < nameB) {
			return -1
		}
		if (nameB < nameA) {
			return 1
		}
		return 0
	}

	const sortFunctionByLastname_e = (a, b) => {
		const nameA = a.name_e.lastname
		const nameB = b.name_e.lastname
		if (nameA < nameB) {
			return -1
		}
		if (nameB < nameA) {
			return 1
		}
		return 0
	}

	const sortFunctionByKatakanaLastName = (a, b) => {
		const katakanaList = 'アイウエオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂツヅテデトドナニヌネノハバヴパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワヷヰヸヱヹヲヺンー'
		const minLength = Math.min(a.name_k.lastname.length, b.name_k.lastname.length)
		let i, katakanaA, katakanaB
		for (i = 0; i < minLength; i++) {
			katakanaA = katakanaList.indexOf(a.name_k.lastname[i])
			katakanaB = katakanaList.indexOf(b.name_k.lastname[i])
			if (katakanaA !== katakanaB) {
				break
			}
			if (i === minLength - 1) {
				katakanaA = a.name_k.lastname.length === minLength ? -1 : katakanaA
				katakanaB = b.name_k.lastname.length === minLength ? -1 : katakanaB
			}
		}
		return katakanaA - katakanaB	
	}

	const sortFunctionByKatakanaFirstName = (a, b) => {
		const katakanaList = 'アイウエオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂツヅテデトドナニヌネノハバヴパヒビピフブプヘベペホボポマミムメモヤユヨラリルレロワヷヰヸヱヹヲヺンー'
		const minLength = Math.min(a.name_k.firstname.length, b.name_k.firstname.length)
		let i, katakanaA, katakanaB
		for (i = 0; i < minLength; i++) {
			katakanaA = katakanaList.indexOf(a.name_k.firstname[i])
			katakanaB = katakanaList.indexOf(b.name_k.firstname[i])
			if (katakanaA !== katakanaB) {
				break
			}
			if (i === minLength - 1) {
				katakanaA = a.name_k.firstname.length === minLength ? -1 : katakanaA
				katakanaB = b.name_k.firstname.length === minLength ? -1 : katakanaB
			}
		}
		return katakanaA - katakanaB	
	}

	const sortFunctionByKks = (a, b) => {
		const kksA = a.kks ? 99 : 1
		const kksB = b.kks ? 99 : 1
		return kksA - kksB
	}

	const sortFunctionByValue = (a, b) => {
		const valueA = a.value
		const valueB = b.value
		return valueB - valueA
	}

	const sortFunctionByFanSize = (a, b) => {
		const fanA = a.fanSize
		const fanB = b.fanSize
		return fanB - fanA
	}

	const sortFunctionByHometown = (x, y) => {
		const prefectureList = [
			'Hokkaido', 'Aomori', 'Akita', 'Iwate', 'Yamagata', 'Miyagi', 'Fukushima',
			'Ibaraki', 'Tochigi', 'Gunma', 'Saitama', 'Chiba', 'Tokyo', 'Kanagawa', 'Niigata', 'Yamanashi',
			'Aichi', 'Shizuoka', 'Gifu', 'Mie', 'Toyama', 'Ishikawa', 'Fukui', 'Nagano',
			'Osaka', 'Kyoto', 'Hyogo', 'Wakayama', 'Nara', 'Shiga',
			'Tottori', 'Shimane', 'Okayama', 'Hiroshima', 'Yamaguchi', 'Tokushima', 'Kagawa', 'Ehime', 'Kochi',
			'Fukuoka', 'Saga', 'Nagasaki', 'Kumamoto', 'Oita', 'Miyazaki', 'Kagoshima', 'Okinawa',
			'Taiwan'
		]
		let prefectureX = prefectureList.indexOf(x.hometown)
		let prefectureY = prefectureList.indexOf(y.hometown)
		return prefectureX - prefectureY	
	}

	const englishNameSort = (members) => {
		let sortingMembers = members
		sortingMembers = sortingMembers.sort(sortFunctionByFirstname_e)
		sortingMembers = sortingMembers.sort(sortFunctionByLastname_e)
		return sortingMembers
	}

	const katakanaSort = (members) => {
		let sortingMembers = members
		sortingMembers = sortingMembers.sort(sortFunctionByKatakanaFirstName)
		sortingMembers = sortingMembers.sort(sortFunctionByKatakanaLastName)
		return sortingMembers
	}
	
	const defaultSort = (members) => {
		let nonT8Members = members.filter(m => m.team[0] !== 'Team 8')
		let t8Members = members.filter(m => m.team[0] === 'Team 8')
		nonT8Members = katakanaSort(nonT8Members)
		nonT8Members = nonT8Members.sort(sortFunctionByKks)
		nonT8Members = nonT8Members.sort(sortFunctionByTeam)
		t8Members = t8Members.sort(sortFunctionByHometown)
		const sortedMembers = nonT8Members.concat(t8Members)
		return sortedMembers
	}

	switch(action.type) {
		case 'INIT_MEMBERS': {
			const sortedMember = defaultSort(action.data)
			return sortedMember
		}
		case 'ADD_MEMBER': {
			let newState = state.concat(action.data)
			newState = defaultSort(newState)
			return newState
		}
		case 'EDIT_MEMBER': {
			const newState = state.map(m => m.id.toString().includes(action.data.id) ? action.data : m)
			return newState
		}
		case 'MEMBERSORT_DEFAULT': {
			let sortedMember = state.slice(0)
			sortedMember = defaultSort(sortedMember)
			return sortedMember
		}
		case 'MEMBERSORT_GENERATION': {
			let sortedMember = state.slice(0)
			sortedMember = sortedMember.sort(sortFunctionByGen)
			return sortedMember
		}
		case 'MEMBERSORT_TEAM': {
			let sortedMember = state.slice(0)
			sortedMember = sortedMember.sort(sortFunctionByTeam)
			return sortedMember
		}
		case 'MEMBERSORT_ENGLISHNAME': {
			let sortedMember = state.slice(0)
			sortedMember = englishNameSort(sortedMember)
			return sortedMember
		}
		case 'MEMBERSORT_KATAKANA': {
			let sortedMember = state.slice(0)
			sortedMember = katakanaSort(sortedMember)
			return sortedMember
		}
		case 'MEMBERSORT_HOMETOWN': {
			let sortedMember = state.slice(0)
			sortedMember = sortedMember.sort(sortFunctionByHometown)
			return sortedMember
		}
		case 'MEMBERSORT_VALUE': {
			let sortedMember = state.slice(0)
			sortedMember = sortedMember.sort(sortFunctionByValue)
			return sortedMember
		}
		case 'MEMBERSORT_FANSIZE': {
			let sortedMember = state.slice(0)
			sortedMember = sortedMember.sort(sortFunctionByFanSize)
			return sortedMember
		}
		case 'UPDATE_MEMBER_BID': {
			const newState = state.map(m => m.id === action.data.id ? action.data : m)
			return newState
		}
		default:
			return state
	}
}

export const initializeMembers = () => {
	return async dispatch => {
		const members = await memberService.getAll()
		dispatch({
			type: 'INIT_MEMBERS',
			data: members
		})
	}
}

export const addNewMember = (member, token) => {
	return async dispatch => {
		const addedMember = await memberService.addMember(member, token)
		dispatch({
			type: 'ADD_MEMBER',
			data: addedMember
		})
		return addedMember
	}
}

export const editExistingMember = (id, member, token) => {
	return async dispatch => {
		const editedMember = await memberService.editMember(id, member, token)
		dispatch({
			type: 'EDIT_MEMBER',
			data: editedMember
		})
		return editedMember
	}
}

export const sortMembersByDefault = () => {
	return async dispatch => {
		dispatch({
			type: 'MEMBERSORT_DEFAULT'
		})
	}
}

export const sortMembersByGen = () => {
	return async dispatch => {
		dispatch({
			type: 'MEMBERSORT_GENERATION'
		})
	}
}

export const sortMembersByTeam = () => {
	return async dispatch => {
		dispatch({
			type: 'MEMBERSORT_TEAM'
		})
	}
}

export const sortMembersByEnglishName = () => {
	return async dispatch => {
		dispatch({
			type: 'MEMBERSORT_ENGLISHNAME'
		})
	}
}

export const sortMembersByKatakana = () => {
	return async dispatch => {
		dispatch({
			type: 'MEMBERSORT_KATAKANA'
		})
	}
}

export const sortMembersByHometown = () => {
	return async dispatch => {
		dispatch({
			type: 'MEMBERSORT_HOMETOWN'
		})
	}
}

export const sortMembersByValue = () => {
	return async dispatch => {
		dispatch({
			type: 'MEMBERSORT_VALUE'
		})
	}
}

export const sortMembersByFanSize = () => {
	return async dispatch => {
		dispatch({
			type: 'MEMBERSORT_FANSIZE'
		})
	}
}

export const updateMemberBid = (memberUpdate) => {
	return async dispatch => {
		dispatch({
			type: 'UPDATE_MEMBER_BID',
			data: memberUpdate
		})
	}
}

export default membersReducer