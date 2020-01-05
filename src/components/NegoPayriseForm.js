import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import negotiationsService from '../services/negotiations'
import { setUserByToken } from '../reducers/userReducer'
import { initializeMembers } from '../reducers/membersReducer'
import { connect } from 'react-redux'
import { Form, Button, Confirm } from 'semantic-ui-react'

const PayriseForm = (props) => {
	const { shownMember } = props
	const [payrise, setPayrise] = useState('')
	const [confirmOpen, setConfirmOpen] = useState(false)

	const inlineStyle = {
		display: 'inline'
	}

	const handlePayriseCancel = () => {
		setConfirmOpen(false)
	}

	const handlePayriseConfirm = async (event) => {
		event.preventDefault()
		try {
			const payriseBody = {
				memberId: shownMember.id,
				amount: payrise
			}
			const updatedMember = await negotiationsService.memberPayrise(payriseBody, props.token)
			await props.setUserByToken(props.token)
			await props.initializeMembers()
			props.setNotification({ content: `value of ${shownMember.name_j} is raised by ${payriseBody.amount} to ${updatedMember.value}`, colour: 'green' })
			setPayrise('')
		} catch (exception) {
			props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
		}
	}

	const handlePayrise = async (event) => {
		event.preventDefault()
		setConfirmOpen(true)
	}

	return (
		<React.Fragment>
			<Form onSubmit={handlePayrise} style={props.style}>
				<Form.Input
					style={inlineStyle}
					type="number"
					label='Pay Rise Amount:'
					placeholder={payrise}
					onChange={({ target }) => setPayrise(target.value)}
					value={payrise}
				/>
				<Button type="submit" color='pink'>
					Confirm Pay Rise
				</Button>
			</Form>
			<Confirm
				open={confirmOpen}
				content={`Confirm to value up ${shownMember.nickname} by $${payrise} to $${parseInt(shownMember.value) + parseInt(payrise)}?`}
				onCancel={handlePayriseCancel}
				onConfirm={handlePayriseConfirm}
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

export default connect(mapStateToProps, mapDispatchToProps)(PayriseForm)