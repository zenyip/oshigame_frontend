import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import negotiationsService from '../services/negotiations'
import jobService from '../services/job'
import { setUserByToken } from '../reducers/userReducer'
import { updateMemberBid, initializeMembers } from '../reducers/membersReducer'
import { connect } from 'react-redux'
import { Form, Button, Grid, Table, Confirm, Select } from 'semantic-ui-react'

const Member = (props) => {
	const { shownMember, serverTime } = props
	const [bid, setBid] = useState('')
	const [offer, setOffer] = useState('')
	const [payrise, setPayrise] = useState('')
	const [forceTradeConfirmOpen, setForceTradeConfirmOpen] = useState(false)
	const [releaseConfirmOpen, setReleaseConfirmOpen] = useState(false)
	const [assignment, setAssignemt] = useState('')
	const [collectable, setCollectable] = useState(false)

	const assignmentOptions = [
		{ key: 'assignment1', text: '1hr Showroom (free, gain little fans)', value: 'SHOWROOM' },
		{ key: 'assignment2', text: '4hr handshaking (4hr salary, gain money base on fanbase size)', value: 'HANDSHAKE' },
		{ key: 'assignment3', text: '2hr TV show ($1000 + 2hr salary, gain large number of fans)', value: 'TV' }
	]

	const inlineStyle = {
		display: 'inline'
	}

	let bidFormStyle = { display: 'none' }
	let offerFormStyle = { display: 'none' }
	let payriseFormStyle = { display: 'none' }
	let releaseButtonStyle = { display: 'none' }
	let assignmentFormStyle = { display: 'none' }
	let assignmentCancelStyle = { display: 'none' }
	let assignmentCollectStyle = { display: 'none' }

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

	if (shownMember && props.user) {
		if (shownMember.agency) {
			if (shownMember.agency.displayname.toString().includes(props.user.displayname)) {
				releaseButtonStyle = { display: 'inline' }
				payriseFormStyle = { display: 'inline' }
				if (props.phrase === 'general') {
					if (!shownMember.job) {
						assignmentFormStyle = { display: null }
					} else {
						if (collectable) {
							assignmentCollectStyle = { display: 'inline' }
						}
						assignmentCancelStyle = { display: 'inline' }
					}
				}
			}
		}
		if (props.phrase === 'negotiation') {
			if (!shownMember.agency) {
				bidFormStyle = { display: 'inline' }
			} else {
				if (!shownMember.agency.displayname.toString().includes(props.user.displayname)){
					offerFormStyle = { display: 'inline' }
				}
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

		const handlePayrise = async (event) => {
			event.preventDefault()
			try {
				const payriseBody = {
					memberId: shownMember.id,
					amount: payrise
				}
				const updatedMember = await negotiationsService.memberPayrise(payriseBody, props.token)
				await props.setUserByToken(props.token)
				await props.initializeMembers()
				props.setNotification({ content: `value of ${shownMember.name_j} is raised by ${payriseBody.amount} to ${updatedMember.value}`, colour: 'green' }, 5)
				setPayrise('')
			} catch (exception) {
				props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
			}
		}

		const handleRelease = async (event) => {
			event.preventDefault()
			setReleaseConfirmOpen(true)
		}

		const handleAssign = async (event) => {
			event.preventDefault()
			if (!assignment) {
				props.setNotification({ content: 'assignment has not been chosen' , colour: 'red' }, 5)
				return
			}
			try {
				const assignedMember = await jobService.assignJob(shownMember.id, assignment, props.token)
				await props.initializeMembers()
				props.setNotification({ content: `${assignedMember.job.name} is assigned.`, colour: 'green' }, 5)
				setAssignemt('')
			} catch (exception) {
				props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
			}
		}

		const handleAssignmentCancel = async (event) => {
			event.preventDefault()
			try {
				await jobService.cancelJob(shownMember.id, props.token)
				await props.initializeMembers()
				props.setNotification({ content: `job is cancelled`, colour: 'green' }, 5)
			} catch (exception) {
				props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
			}
		}

		const handleAssignmentCollect = async (event) => {
			event.preventDefault()
			try {
				const collectedRewards = await jobService.collectJob(shownMember.id, props.token)
				await props.initializeMembers()
				props.setNotification({ content: `gained ${collectedRewards.fanReward} fans and $${collectedRewards.moneyReward}`, colour: 'green' }, 5)
			} catch (exception) {
				props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
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

		const remainTime = (endTime) => {
			const endTimeMS = Date.parse(endTime)
			const currentTimeMS = Date.parse(serverTime)
			const remainTimeMS = endTimeMS - currentTimeMS
			if (remainTimeMS > 0) {
				let remainTimeS = Math.floor(remainTimeMS / 1000)
				const remainHrs = Math.floor(remainTimeS / 3600)
				remainTimeS = remainTimeS % 3600
				const remainMins = Math.floor(remainTimeS / 60)
				const remainS = remainTimeS % 60
				return `back in ${remainHrs} hr ${remainMins} min ${remainS} s`
			} else {
				if (!collectable) {
					setCollectable(true)
				}
				return 'is ready to collect'
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
										<Table.Cell>Nickname:</Table.Cell>
										<Table.Cell>{shownMember.nickname}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Date Of Birth:</Table.Cell>
										<Table.Cell>{bday}</Table.Cell>
										<Table.Cell>Hometown:</Table.Cell>
										<Table.Cell>{shownMember.hometown}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Team:</Table.Cell>
										<Table.Cell>{shownMember.team.join(" and ")}</Table.Cell>
										<Table.Cell>Generation:</Table.Cell>
										<Table.Cell>{shownMember.generation.name}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Member Status:</Table.Cell>
										<Table.Cell>{shownMember.current ? 'Current Member' : 'Graduate'} {shownMember.kks ? '(Kenkyosen)' : ''}</Table.Cell>
										<Table.Cell />
										<Table.Cell />
									</Table.Row>
									<Table.Row>
										<Table.Cell>Value:</Table.Cell>
										<Table.Cell>{shownMember.value}</Table.Cell>
										<Table.Cell>Salary:</Table.Cell>
										<Table.Cell>{Math.floor(shownMember.value/10)}/hr</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Agency:</Table.Cell>
										<Table.Cell>{shownMember.agency ? shownMember.agency.displayname : 'Free' }</Table.Cell>
										<Table.Cell>Fanbase Size:</Table.Cell>
										<Table.Cell>{shownMember.fanSize}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Current Job:</Table.Cell>
										<Table.Cell>{shownMember.job ? shownMember.job.name : 'None'}</Table.Cell>
										<Table.Cell>{shownMember.job ? remainTime(shownMember.job.endTime) : null}</Table.Cell>
										<Table.Cell />
									</Table.Row>
								</Table.Body>
							</Table>
							<Form onSubmit={handleAssign} style={assignmentFormStyle}>
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
							<Button onClick={handleAssignmentCollect} style={assignmentCollectStyle} color='pink'>
								Collect Assignment Rewards
							</Button>
							<Button onClick={handleAssignmentCancel} style={assignmentCancelStyle} color='violet'>
								Cancel Assignment
							</Button>
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
				<Form onSubmit={handlePayrise} style={payriseFormStyle}>
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
		phrase: state.phrase,
		serverTime: state.serverTime
	}
}

const mapDispatchToProps = {
	setNotification,
	setUserByToken,
	updateMemberBid,
	initializeMembers
}

export default connect(mapStateToProps, mapDispatchToProps)(Member)