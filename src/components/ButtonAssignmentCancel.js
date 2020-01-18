import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import jobService from '../services/job'
import { setUserByToken } from '../reducers/userReducer'
import { initializeMembers } from '../reducers/membersReducer'
import { connect } from 'react-redux'
import { Button, Confirm  } from 'semantic-ui-react'

const ButtonAssignmentCancel = (props) => {
	const { shownMember } = props
	const [confirmOpen, setConfirmOpen] = useState(false)
	const [dummyConfirmOpen, setDummyConfirmOpen] = useState(false)

	let style = {}
	if (props.style) {
		style = props.style
	} else {
		style = shownMember.job ? { display: 'inline' } : { display: 'none' } 
	}

	const handleCancelCancel = () => {
		setConfirmOpen(false)
	}

	const handleCancelConfirm = async (event) => {
		event.preventDefault()
		setConfirmOpen(false)
		setDummyConfirmOpen(true)
		try {
			await jobService.cancelJob(shownMember.id, props.token)
			await props.initializeMembers()
			await props.setUserByToken(props.token)
			props.setNotification({ content: `job is cancelled`, colour: 'green' })
		} catch (exception) {
			props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
		}
		setDummyConfirmOpen(false)
	}

	const handleAssignmentCancel = async (event) => {
		event.preventDefault()
		setConfirmOpen(true)
	}

	const handleDummyClick = (event) => {
		event.preventDefault()
	}

	return (
		<React.Fragment>
			<Button onClick={handleAssignmentCancel} style={style} color='violet'>
				{props.short ? 'Cancel' : 'Cancel Assignment'}
			</Button>
			<Confirm
				open={confirmOpen}
				cancelButton='Back'
				confirmButton="Confirm Cancel"
				content={`Confirm to cancel the assignment of ${shownMember.nickname}? (No Refund)`}
				onCancel={handleCancelCancel}
				onConfirm={handleCancelConfirm}
			/>
			<Confirm
				open={dummyConfirmOpen}
				content={`Please wait......`}
				onCancel={handleDummyClick}
				onConfirm={handleDummyClick}
			/>
		</React.Fragment>
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