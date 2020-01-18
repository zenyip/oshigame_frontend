import React, { useState, useEffect } from 'react'
import ButtonProcessing from './ButtonProcessing'
import { setNotification } from '../reducers/notificationReducer'
import negotiationsService from '../services/negotiations'
import { setUserByToken } from '../reducers/userReducer'
import { initializeMembers } from '../reducers/membersReducer'
import { connect } from 'react-redux'
import { Form, Button, Confirm } from 'semantic-ui-react'

const OfferForm = (props) => {
	const { shownMember } = props
	const [offer, setOffer] = useState('')
	const [forceTradeConfirmOpen, setForceTradeConfirmOpen] = useState(false)
	const [dummyConfirmOpen, setDummyConfirmOpen] = useState(false)
	const [processing, setProcessing] = useState(false)

	const inlineStyle = {
		display: 'inline'
	}

	const lowerLimit = Math.floor(shownMember.value*0.8)
	const upperLimit = Math.floor(shownMember.value*1.3)
	const forceTradePrice = upperLimit + 1

	useEffect (() => {
		setOffer(lowerLimit)
	}, [lowerLimit])

	const handleForceTradeCancel = () => {
		setForceTradeConfirmOpen(false)
	}

	const handleForceTradeConfirm = async () => {
		setForceTradeConfirmOpen(false)
		setDummyConfirmOpen(true)
		try {
			const newForceTrade = {
				memberId: shownMember.id,
				bid: forceTradePrice,
				tradeType: 'force',
				recipient: shownMember.agency
			}
			await negotiationsService.applyForceTrade(newForceTrade, props.token)
			await props.setUserByToken(props.token)
			await props.initializeMembers()
			props.setNotification({ content: `a force trade is applied at $${forceTradePrice} for signing ${shownMember.name_j} from ${shownMember.agency.displayname} `, colour: 'green' })
		} catch (exception) {
			props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
		}
		setDummyConfirmOpen(false)
	}

	const handleOffer = async (event) => {
		event.preventDefault()
		if (props.phrase === 'negotiation') {
			setProcessing(true)
			if (offer < lowerLimit) {
				props.setNotification({ content: 'your offer is too low', colour: 'red' }, 5)
			} else if (offer > upperLimit) {
				setForceTradeConfirmOpen(true)
			} else {
				try {
					const newOffer = {
						memberId: shownMember.id,
						bid: offer,
						tradeType: 'offer',
						recipient: shownMember.agency
					}
					await negotiationsService.sendOffer(newOffer, props.token)
					await props.setUserByToken(props.token)
					props.setNotification({ content: `an offer of $${offer} is sent to ${shownMember.agency.displayname} for signing ${shownMember.name_j}`, colour: 'green' })
				} catch (exception) {
					props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
				}
			}
			setProcessing(false)
		}
	}

	const handleDummyClick = (event) => {
		event.preventDefault()
	}

	const button = () => processing ?
		<ButtonProcessing /> : (
		<Button type="submit" color='pink'>
			Send Negotiation Offer
		</Button>
	)

	return (
		<React.Fragment>
			<Form onSubmit={handleOffer} style={props.style}>
				<Form.Input
					style={inlineStyle}
					type="number"
					label={`Offer: (Range: ${lowerLimit}-${upperLimit} or Forced Trade at ${forceTradePrice})`}
					placeholder={offer}
					onChange={({ target }) => setOffer(target.value)}
					value={offer}
				/>
				{button()}
			</Form>
			<Confirm
				open={forceTradeConfirmOpen}
				content={`Confirm to force trade ${shownMember.nickname} at ${forceTradePrice} ?`}
				onCancel={handleForceTradeCancel}
				onConfirm={handleForceTradeConfirm}
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
		phrase: state.phrase,
	}
}

const mapDispatchToProps = {
	setNotification,
	setUserByToken,
	initializeMembers
}

export default connect(mapStateToProps, mapDispatchToProps)(OfferForm)