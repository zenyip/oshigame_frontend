import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {

	if (props.notification.content === null) {
		return null
	}

	return (
		<Message color={props.notification.colour}>{props.notification.content}</Message>
	)
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

export default connect(mapStateToProps)(Notification)