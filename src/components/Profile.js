import React from 'react'
import { connect } from 'react-redux'

const Profile = (props) => {
	const { user } = props

	const headstyle = {
		paddingTop: "20px"
	}

	if (user) {
		return (
			<div>
				<h2>Profile</h2>
				<div>
					<h3 style={headstyle}>{user.username}</h3>
					<div>displayname: {user.displayname}</div>
					<div>admin: {user.admin ? "Yes" : "No"}</div>
					<div>oshimens: {user.oshimens.length}</div>
				</div>
			</div>
		)
	} else {
		return <div>loading...</div>
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	}
}

export default connect(mapStateToProps)(Profile)