import React from 'react'
import User from './User'
import { connect } from 'react-redux'

const Profile = (props) => {
	const { user, members } = props

	if (user && members.length > 0) {
		return (
			<div>
				<h2>Profile</h2>
				<User shownUser = {user} />
			</div>
		)
	} else {
		return <div>loading...</div>
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		members: state.members
	}
}

export default connect(mapStateToProps)(Profile)