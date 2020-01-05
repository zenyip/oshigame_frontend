import React from 'react'
import { setNotification } from '../reducers/notificationReducer'
import jobService from '../services/job'
import { setUserByToken } from '../reducers/userReducer'
import { initializeMembers } from '../reducers/membersReducer'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

const ButtonAssignmentCancel = (props) => {
	const { shownMember } = props
	let style = {}
	if (props.style) {
		style = props.style
	} else {
		style = shownMember.job ? { display: 'inline' } : { display: 'none' } 
	}

	const handleAssignmentCancel = async (event) => {
		event.preventDefault()
		try {
			await jobService.cancelJob(shownMember.id, props.token)
			await props.initializeMembers()
			await props.setUserByToken(props.token)
			props.setNotification({ content: `job is cancelled`, colour: 'green' })
		} catch (exception) {
			props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
		}
	}

	return (
		<Button onClick={handleAssignmentCancel} style={style} color='violet'>
			{props.short ? 'Cancel' : 'Cancel Assignment'}
		</Button>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
	}
}

const mapDispatchToProps = {
	setNotification,
	setUserByToken,
	initializeMembers
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAssignmentCancel)