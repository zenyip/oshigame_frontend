import React from 'react'
import { connect } from 'react-redux'

const Profile = (props) => {
	const { user, members } = props

	const headstyle = {
		paddingTop: "20px"
	}

	if (user) {

		const oshimenList = (u) => {
			const oshimens = u.oshimens.map(m => m.nickname)
			return u.oshimens.length > 0 ? oshimens.join(', ') : 'none'
		}

		const negotiationList = (u) => {
			if (u.negotiations.length > 0) {
				const digestedList = u.negotiations.map(n => {
					const member = members.filter(m => m.id === n.member)
					const name = member[0].nickname
					return `${name} at ${n.bid}`
				})
				return digestedList.join(', ')
			} else {
				return 'none'
			}
		}

		return (
			<div>
				<h2>Profile</h2>
				<div>
					<h3 style={headstyle}>{user.username}</h3>
					<div>displayname: {user.displayname}</div>
					<div>assest: {user.assest}</div>
					<div>admin: {user.admin ? "Yes" : "No"}</div>
					<div>oshimens: {oshimenList(user)} </div>
					<div>negotiations: {negotiationList(user)} </div>
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
		members: state.members
	}
}

export default connect(mapStateToProps)(Profile)