import React, { useState, useEffect } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import negotiationsService from '../services/negotiations'
import { setUserByToken } from '../reducers/userReducer'
import { initializeMembers } from '../reducers/membersReducer'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'

const BidForm = (props) => {
	const { shownMember } = props
	const [bid, setBid] = useState('')

	const inlineStyle = {
		display: 'inline'
	}

	useEffect (() => {
		setBid(shownMember.negotiation ? shownMember.negotiation.bid + 10 : shownMember.value)
	}, [shownMember])

	const handleBid = async (event) => {
		event.preventDefault()
		if (props.phrase === 'negotiation') {
			try {
				const newBid = {
					memberId: shownMember.id,
					bid,
					tradeType: 'bid'
				}
				const placedBid = await negotiationsService.placeBid(newBid, props.token)
				await props.setUserByToken(props.token)
				const memberUpdate = {
					...shownMember,
					'negotiation': {
						'member': placedBid.member,
						'bid': placedBid.bid,
						'tradeType': placedBid.tradeType,
						'applicant': placedBid.applicant,
						'id': placedBid.id
					}
				}
				props.updateMemberBid(memberUpdate)
				setBid(shownMember.value)
				props.setNotification({ content: `a bid of $${bid} is placed for signing ${shownMember.name_j}`, colour: 'green' })
			} catch (exception) {
				props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
			}
		}
	}

	const currentBid = () => {
		if (!shownMember.negotiation) {
			return 'none'
		} else {
			if (props.user) {
				return `${shownMember.negotiation.bid} from ${props.user.id === shownMember.negotiation.applicant? 'YOU' : 'other user'}.`
			} else {
				return '---'
			}
		}
	}

	return (
		<Form onSubmit={handleBid} style={props.style}>
			<Form.Input
				style={inlineStyle}
				type="number"
				label={`Bid: (highest bid at the moment: ${currentBid()})`}
				placeholder={bid}
				onChange={({ target }) => setBid(target.value)}
				value={bid}
			/>
			<Button type="submit" color='pink'>
				Place Bid
			</Button>
		</Form>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
		phrase: state.phrase,
		user: state.user
	}
}

const mapDispatchToProps = {
	setNotification,
	setUserByToken,
	initializeMembers
}

export default connect(mapStateToProps, mapDispatchToProps)(BidForm)