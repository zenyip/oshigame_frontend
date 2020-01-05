import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import negotiationsService from '../services/negotiations'
import { setUserByToken } from '../reducers/userReducer'
import { initializeMembers } from '../reducers/membersReducer'
import { connect } from 'react-redux'
import { Button, Confirm } from 'semantic-ui-react'

const ButtonLateSign = (props) => {
	const { shownMember } = props
	const [lateSignConfirmOpen, setLateSignConfirmOpen] = useState(false)

	const lateSignPrice = Math.floor(shownMember.value*1.2)

	const handleLateSignCancel = () => {
		setLateSignConfirmOpen(false)
	}

	const handleLateSignConfirm = async () => {
		try {
			const newLateSign = {
				memberId: shownMember.id,
				bid: lateSignPrice,
				tradeType: 'late',
				recipient: shownMember.agency
			}
			await negotiationsService.lateSign(newLateSign, props.token)
			await props.setUserByToken(props.token)
			await props.initializeMembers()
			props.setNotification({ content: `late signed ${shownMember.name_j} at $${lateSignPrice}. `, colour: 'green' })
		} catch (exception) {
			props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
		}
		setLateSignConfirmOpen(false)
	}

	const handleLateSign = async (event) => {
		event.preventDefault()
		setLateSignConfirmOpen(true)
	}

	return (
		<React.Fragment>
			<Button onClick={handleLateSign} style={props.style} color='pink'>
					Late Sign at ${lateSignPrice}
			</Button>
			<Confirm
				open={lateSignConfirmOpen}
				content={`Confirm to late sign ${shownMember.nickname} at ${lateSignPrice} ?`}
				onCancel={handleLateSignCancel}
				onConfirm={handleLateSignConfirm}
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

export default connect(mapStateToProps, mapDispatchToProps)(ButtonLateSign)