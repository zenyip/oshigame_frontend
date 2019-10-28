import React, { useEffect }  from 'react'
import { allUsers } from '../reducers/usersReducer'
import { connect } from 'react-redux'

const Users = (props) => {

	useEffect (() => {
		if (props.token && props.user) {
			if (props.user.admin) {
				props.allUsers(props.token)
			}
		}
	}, [props.token, props.user])

	const headstyle = {
		paddingTop: "20px"
	}

	const usersList = () => {
		if (props.users.length > 0) {
			return props.users.map(u => (
				<div key={u.id}>
					<h3 style={headstyle}>{u.username}</h3>
					<div>displayname: {u.displayname}</div>
					<div>admin: {u.admin ? "Yes" : "No"}</div>
					<div>oshimens: {u.oshimens.length}</div>
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
		users: state.users
	}
}

const mapDispatchToProps = {
	allUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)