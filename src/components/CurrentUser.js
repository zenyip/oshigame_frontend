import React from 'react'
import { connect } from 'react-redux'
import Logout from './Logout'

const CurrentUser = (props) => {
	const style = { display: 'inline' }
	if (props.user) {
		return (
			<div style={style}> {props.user.displayname} logged in <Logout /> </div>
		)
	} else {
		return (
			null
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(CurrentUser)