import React, { useState } from 'react'
import ButtonProcessing from './ButtonProcessing'
import { setNotification } from '../reducers/notificationReducer'
import jobService from '../services/job'
import { setUserByToken } from '../reducers/userReducer'
import { initializeMembers } from '../reducers/membersReducer'
import { connect } from 'react-redux'
import { Form, Button, Select } from 'semantic-ui-react'

const AssignmentForm = (props) => {
	const { shownMember } = props
	const [assignment, setAssignemt] = useState('')
	const [processing, setProcessing] = useState(false)

	const assignmentOptions = [
		{ key: 'assignment1', text: '1hr Showroom (free, gain little fans). Cost: Free / Expected Reward: ~50 fans', value: 'SHOWROOM' },
		{ key: 'assignment2', text: `4hr handshaking (4hr salary, gain money base on fanbase size). Cost: $${Math.floor(shownMember.value*0.4)} / Expected Reward: ~$${Math.floor(shownMember.fanSize*0.7)}`, value: 'HANDSHAKE' },
		{ key: 'assignment3', text: `2hr TV show ($1000 + 2hr salary, gain large number of fans). Cost: $${Math.floor(shownMember.value*0.2) + 1000} / Expected Reward: ~750 fans`, value: 'TV' }
	]

	const handleAssign = async (event) => {
		event.preventDefault()
		setProcessing(true)
		if (!assignment) {
			props.setNotification({ content: 'assignment has not been chosen' , colour: 'red' })
			setProcessing(false)
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
		setProcessing(false)
	}

	const button = () => processing ?
		<ButtonProcessing /> :
		<Button type="submit">Assign</Button>

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
			{button()}
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