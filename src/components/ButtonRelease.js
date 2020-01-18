import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import negotiationsService from '../services/negotiations'
import { setUserByToken } from '../reducers/userReducer'
import { initializeMembers } from '../reducers/membersReducer'
import { connect } from 'react-redux'
import { Button, Confirm } from 'semantic-ui-react'

const ButtonRelease = (props) => {
	const { shownMember } = props
	const [releaseConfirmOpen, setReleaseConfirmOpen] = useState(false)
	const [dummyConfirmOpen, setDummyConfirmOpen] = useState(false)

	const releasePrice = Math.floor(shownMember.value*0.5)

	const handleReleaseCancel = () => {
		setReleaseConfirmOpen(false)
	}

	const handleReleaseConfirm = async () => {
		setReleaseConfirmOpen(false)
		setDummyConfirmOpen(true)
		try {
			const newRelease = {
				memberId: shownMember.id,
				bid: releasePrice,
				tradeType: 'release',
			}
			await negotiationsService.releaseMember(newRelease, props.token)
			await props.setUserByToken(props.token)
			await props.initializeMembers()
			props.setNotification({ content: `${shownMember.name_j} is released and cash back ${releasePrice}`, colour: 'green' })
		} catch (exception) {
			props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
		}
		setDummyConfirmOpen(false)
	}

	const handleRelease = async (event) => {
		event.preventDefault()
		setReleaseConfirmOpen(true)
	}

	const handleDummyClick = (event) => {
		event.preventDefault()
	}

	return (
		<React.Fragment>
			<Button onClick={handleRelease} style={props.style} color='violet'>
				Release
			</Button>
			<Confirm
				open={releaseConfirmOpen}
				content={`Confirm to RELEASE ${shownMember.nickname} and get back ${releasePrice} ?`}
				onCancel={handleReleaseCancel}
				onConfirm={handleReleaseConfirm}
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonRelease)