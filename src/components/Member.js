import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import negotiationsService from '../services/negotiations'
import { setUserByToken } from '../reducers/userReducer'
import { updateMemberBid, initializeMembers } from '../reducers/membersReducer'
import { connect } from 'react-redux'
import { Form, Button, Grid, Table, Confirm } from 'semantic-ui-react'

const Member = (props) => {
	const { shownMember } = props
	const [bid, setBid] = useState('')
	const [offer, setOffer] = useState('')
	const [forceTradeConfirmOpen, setForceTradeConfirmOpen] = useState(false)
	const [releaseConfirmOpen, setReleaseConfirmOpen] = useState(false)

	const inlineStyle = {
		display: 'inline'
	}

	let bidFormStyle = { display: 'none' }
	let offerFormStyle = { display: 'none' }
	let releaseButtonStyle = { display: 'none' }

	let lowerLimit = null
	let upperLimit = null
	let forceTradePrice = null
	let releasePrice = null

	if (shownMember) {
		lowerLimit = Math.floor(shownMember.value*0.8)
		upperLimit = Math.floor(shownMember.value*1.3)
		forceTradePrice = upperLimit + 1
		releasePrice = Math.floor(shownMember.value*0.5)
	}

	if (shownMember && props.phrase === 'negotiation' && props.user) {
		if (!shownMember.agency) {
			bidFormStyle = { display: 'inline' }
		} else {
			if (shownMember.agency.displayname.toString().includes(props.user.displayname) && shownMember.tradable) {
				releaseButtonStyle = { display: 'inline' }
			} else {
				offerFormStyle = { display: 'inline' }
			}
			
		}
	}

	useEffect (() => {
		if (shownMember) {
			setBid(shownMember.negotiation ? shownMember.negotiation.bid + 10 : shownMember.value)
			setOffer(lowerLimit)
		}
	}, [shownMember, lowerLimit])

	if (shownMember) {

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
					props.setNotification({ content: `a bid of $${bid} is placed for signing ${shownMember.name_j}`, colour: 'green' }, 5)
				} catch (exception) {
					props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
				}
			}
		}

		const handleForceTradeCancel = () => {
			setForceTradeConfirmOpen(false)
		}
	
		const handleForceTradeConfirm = async () => {
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
				props.setNotification({ content: `a force trade is applied at $${forceTradePrice} for signing ${shownMember.name_j} from ${shownMember.agency.displayname} `, colour: 'green' }, 5)
			} catch (exception) {
				props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
			}
			setForceTradeConfirmOpen(false)
		}

		const handleReleaseCancel = () => {
			setReleaseConfirmOpen(false)
		}
	
		const handleReleaseConfirm = async () => {
			try {
				const newRelease = {
					memberId: shownMember.id,
					bid: releasePrice,
					tradeType: 'release',
				}
				await negotiationsService.releaseMember(newRelease, props.token)
				await props.setUserByToken(props.token)
				await props.initializeMembers()
				props.setNotification({ content: `${shownMember.name_j} is released and cash back ${releasePrice}`, colour: 'green' }, 5)
			} catch (exception) {
				props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
			}
			setReleaseConfirmOpen(false)
		}

		const handleOffer = async (event) => {
			event.preventDefault()
			if (props.phrase === 'negotiation') {
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
						props.setNotification({ content: `an offer of $${offer} is sent to ${shownMember.agency.displayname} for signing ${shownMember.name_j}`, colour: 'green' }, 5)
					} catch (exception) {
						props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
					}
				}
			}
		}

		const handleRelease = async (event) => {
			event.preventDefault()
			if (props.phrase === 'negotiation') {
				setReleaseConfirmOpen(true)
			}
		}

		const bday = shownMember.birthday.substring(0, 10)

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
			<div>
				<h2>{shownMember.name_j}</h2>
				<div>{shownMember.name_k.firstname}　{shownMember.name_k.lastname}</div>
				<Grid columns={2}>
					<Grid.Row>
						<Grid.Column width={5}>
							<img src={shownMember.pic_link} alt="profile pic" />
						</Grid.Column>
						<Grid.Column>
							<Table>
								<Table.Body>
									<Table.Row>
										<Table.Cell>Name:</Table.Cell>
										<Table.Cell>{shownMember.name_e.firstname} {shownMember.name_e.lastname}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Nickname:</Table.Cell>
										<Table.Cell>{shownMember.nickname}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Date Of Birth:</Table.Cell>
										<Table.Cell>{bday}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Team:</Table.Cell>
										<Table.Cell>{shownMember.team.join(" and ")}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Generation:</Table.Cell>
										<Table.Cell>{shownMember.generation.name}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Hometown:</Table.Cell>
										<Table.Cell>{shownMember.hometown}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Member Status:</Table.Cell>
										<Table.Cell>{shownMember.current ? 'Current Member' : 'Graduate'} {shownMember.kks ? '(Kenkyosen)' : ''}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Agency:</Table.Cell>
										<Table.Cell>{shownMember.agency ? shownMember.agency.displayname : 'Free' }</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Value:</Table.Cell>
										<Table.Cell>{shownMember.value}</Table.Cell>
									</Table.Row>
								</Table.Body>
							</Table>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Form onSubmit={handleBid} style={bidFormStyle}>
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
				<Form onSubmit={handleOffer} style={offerFormStyle}>
					<Form.Input
						style={inlineStyle}
						type="number"
						label={`Offer: (Range: ${lowerLimit}-${upperLimit} or Forced Trade at ${forceTradePrice})`}
						placeholder={offer}
						onChange={({ target }) => setOffer(target.value)}
						value={offer}
					/>
					<Button type="submit" color='pink'>
						Send Negotiation Offer
					</Button>
				</Form>
				<Button onClick={handleRelease} style={releaseButtonStyle} color='violet'>
					Release
				</Button>
				<Link to={'/members'}>
                    <Button>back</Button>
                </Link>
				<Confirm
					open={forceTradeConfirmOpen}
					content={`Confirm to force trade ${shownMember.nickname} at ${forceTradePrice} ?`}
					onCancel={handleForceTradeCancel}
					onConfirm={handleForceTradeConfirm}
				/>
				<Confirm
					open={releaseConfirmOpen}
					content={`Confirm to RELEASE ${shownMember.nickname} and get back ${releasePrice} ?`}
					onCancel={handleReleaseCancel}
					onConfirm={handleReleaseConfirm}
				/>
			</div>
		)
	} else {
		return (
			<div>
				Member Not found
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
		user: state.user,
		phrase: state.phrase
	}
}

const mapDispatchToProps = {
	setNotification,
	setUserByToken,
	updateMemberBid,
	initializeMembers
}

export default connect(mapStateToProps, mapDispatchToProps)(Member)