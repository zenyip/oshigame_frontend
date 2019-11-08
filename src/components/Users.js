import React, { useEffect }  from 'react'
import { allUsers } from '../reducers/usersReducer'
import { connect } from 'react-redux'

const Users = (props) => {
	const {token, user, users, members, allUsers } = props


	useEffect (() => {
		if (token && user) {
			if (user.admin) {
				allUsers(token)
			}
		}
	}, [token, user, allUsers])

	const headstyle = {
		paddingTop: "20px"
	}

	const oshimenList = (u) => {
		const oshimens = u.oshimens.map(m => m.name_j)
		return u.oshimens.length > 0 ? oshimens.join(', ') : 'none'
	}

	const negotiationList = (u) => {
		if (u.negotiations.length > 0) {
			const digestedList = u.negotiations.map(n => {
				const member = members.filter(m => m.id === n.member)
				const name = member[0].name_j
				return `${name} at ${n.bid}`
			})
			return digestedList.join(', ')
		} else {
			return 'none'
		}
	}

	const usersList = () => {
		if (users.length > 0) {
			return users.map(u => (
				<div key={u.id}>
					<h3 style={headstyle}>{u.username}</h3>
					<div>displayname: {u.displayname}</div>
					<div>assest: {u.assest}</div>
					<div>admin: {u.admin ? "Yes" : "No"}</div>
					<div>oshimens: {oshimenList(u)} </div>
					<div>negotiations: {negotiationList(u)} </div>
				</div>
			))
		} else {
			return <div>loading...</div>
		}
	}

	return (
		<div>
			<h2>Users</h2>
			{ usersList() }
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
		user: state.user,
		users: state.users,
		members: state.members
	}
}

const mapDispatchToProps = {
	allUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)