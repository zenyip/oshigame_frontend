import React from 'react'
import { connect } from 'react-redux'
import { Dimmer, Message } from 'semantic-ui-react'

const Notification = (props) => {

	if (props.notification.content === null) {
		return null
	}

	const active = props.notification.content ? true : false

	return (
		<Dimmer active={active} page>
			<Message color={props.notification.colour}>{props.notification.content}</Message>
		</Dimmer>
	)
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

export default connect(mapStateToProps)(Notification)