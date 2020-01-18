import React, { useState } from 'react'
import ButtonProcessing from './ButtonProcessing'
import { setNotification } from '../reducers/notificationReducer'
import jobService from '../services/job'
import remainTime from './modules/remainTime'
import { setUserByToken } from '../reducers/userReducer'
import { initializeMembers } from '../reducers/membersReducer'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

const ButtonAssignmentCollect = (props) => {
	const { shownMember } = props
	const [processing, setProcessing] = useState(false)

	let style = {}
	if (props.style) {
		style = props.style
	} else {
		style = remainTime.collectable(props.serverTime, shownMember.job) ? { display: 'inline' } : { display: 'none' } 
	}

	const handleAssignmentCollect = async (event) => {
		event.preventDefault()
		setProcessing(true)
		try {
			const response = await jobService.collectJob(shownMember.id, props.token)
			await props.initializeMembers()
			await props.setUserByToken(props.token)
			props.setNotification({
				header: 'Rewards Collected',
				content: [
					`gained ${response.fanReward} fans and $${response.moneyReward}.`,
					`New fans number: ${response.currentFanSize}.`,
					`Current asset: $${response.currentAssest}.`,
					'• (click to continue) • •'
				],
				colour: 'green',
				listing: true
			}, 'byClick')
		} catch (exception) {
			props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
		}
		setProcessing(false)
	}

	return processing ?
		<ButtonProcessing style={style} /> :
		<Button onClick={handleAssignmentCollect} style={style} color='pink'>
			{props.short ? 'Collect' : 'Collect Assignment Rewards'}
		</Button>
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
		serverTime: state.serverTime
	}
}

const mapDispatchToProps = {
	setNotification,
	setUserByToken,
	initializeMembers
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAssignmentCollect)