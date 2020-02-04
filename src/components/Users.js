import React, { useEffect }  from 'react'
import User from './User'
import Loading from './Loading'
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

	const usersList = () => {
		if (users.length > 0 && members.length > 0) {
			return users.map(u => (
				<div key={u.id}>
					<User shownUser = {u} />
						<div>id: {u.id}</div>
				</div>
			))
		} else {
			return <Loading active={true}/>
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