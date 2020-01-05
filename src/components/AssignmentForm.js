import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import jobService from '../services/job'
import { setUserByToken } from '../reducers/userReducer'
import { initializeMembers } from '../reducers/membersReducer'
import { connect } from 'react-redux'
import { Form, Button, Select } from 'semantic-ui-react'

const AssignmentForm = (props) => {
	const { shownMember } = props
	const [assignment, setAssignemt] = useState('')

	const assignmentOptions = [
		{ key: 'assignment1', text: '1hr Showroom (free, gain little fans)', value: 'SHOWROOM' },
		{ key: 'assignment2', text: '4hr handshaking (4hr salary, gain money base on fanbase size)', value: 'HANDSHAKE' },
		{ key: 'assignment3', text: '2hr TV show ($1000 + 2hr salary, gain large number of fans)', value: 'TV' }
	]

	const handleAssign = async (event) => {
		event.preventDefault()
		if (!assignment) {
			props.setNotification({ content: 'assignment has not been chosen' , colour: 'red' })
			return
		}
		try {
			const response = await jobService.assignJob(shownMember.id, assignment, props.token)
			await props.initializeMembers()
			setAssignemt('')
			await props.setUserByToken(props.token)
			props.setNotification({
				header: `${response.job.name} is assigned.`,
				content: `Current asset: $${response.currentAssest}`,
				colour: 'green'
			})
		} catch (exception) {
			props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
		}
	}

	return (
		<Form onSubmit={handleAssign} style={props.style}>
			<Form.Field
				control={Select}
				label='Job Assignment: '
				options={assignmentOptions}
				placeholder='Job Assignment'
				onChange={(e, data) => setAssignemt(data.value)}
				value={assignment}
			/>
			<Button type="submit">Assign</Button>
		</Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentForm)