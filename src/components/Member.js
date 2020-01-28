import React, { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { setUserByToken } from '../reducers/userReducer'
import { updateMemberBid, initializeMembers } from '../reducers/membersReducer'
import remainTime from './modules/remainTime'
import PayriseForm from './NegoPayriseForm'
import BidForm from './NegoBidForm'
import OfferForm from './NegoOfferForm'
import ButtonLateSign from './ButtonLateSign'
import ButtonRelease from './ButtonRelease'
import AssignmentForm from './AssignmentForm'
import ButtonAssignmentCancel from './ButtonAssignmentCancel'
import ButtonAssignmentCollect from './ButtonAssignmentCollect'
import { connect } from 'react-redux'
import { Grid, Table, Dimmer, Message } from 'semantic-ui-react'

const Member = (props) => {
	const { shownMember, serverTime } = props
	const [ dimmerOn, setDimmerOn ] = useState(false)

	let bidFormStyle = { display: 'none' }
	let offerFormStyle = { display: 'none' }
	let payriseFormStyle = { display: 'none' }
	let releaseButtonStyle = { display: 'none' }
	let assignmentFormStyle = { display: 'none' }
	let lateSignButtonStyle = { display: 'none' }
	let assignmentCancelStyle = { display: 'none' }
	let assignmentCollectStyle = { display: 'none' }

	if (shownMember && props.user) {
		if (shownMember.agency) {
			if (shownMember.agency.displayname.toString().includes(props.user.displayname)) {
				releaseButtonStyle = { display: 'inline' }
				payriseFormStyle = { display: 'inline' }
				if (remainTime.collectable(serverTime, shownMember.job)) {
					assignmentCollectStyle = { display: 'inline' }
				}
				if (shownMember.job) {
					assignmentCancelStyle = { display: 'inline' }
				}
				if (props.phrase === 'general') {
					if (!shownMember.job) {
						assignmentFormStyle = { display: null }
					}
				}
			} else {
				if (props.phrase === 'negotiation') {
					offerFormStyle = { display: 'inline' }
				}
			}
		} else {
			if (props.phrase !== 'negotiation' && props.user.oshimens.length < 3) {
				lateSignButtonStyle = { display: 'inline' }
			}
			if (props.phrase === 'negotiation') {
				bidFormStyle = { display: 'inline' }
			}
		}
	}

	if (shownMember) {
		const bday = shownMember.birthday.substring(0, 10)

		return (
			<div>
				<h2>{shownMember.name_j}</h2>
				<div>{shownMember.name_k.firstname}　{shownMember.name_k.lastname}</div>
				<Grid>
					<Grid.Row columns={1} only='mobile'>
						<Grid.Column>
							<img src={shownMember.pic_link} alt="profile pic" />
						</Grid.Column>
						<Grid.Column>
							<Table striped columns={2} unstackable>
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
										<Table.Cell>Hometown:</Table.Cell>
										<Table.Cell>{shownMember.hometown}</Table.Cell>
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
										<Table.Cell>Member Status:</Table.Cell>
										<Table.Cell>{shownMember.current ? 'Current Member' : 'Graduate'} {shownMember.kks ? '(Kenkyosen)' : ''}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Fanbase Size:</Table.Cell>
										<Table.Cell>{shownMember.fanSize}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Value:</Table.Cell>
										<Table.Cell>{shownMember.value}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Salary:</Table.Cell>
										<Table.Cell>{Math.floor(shownMember.value/10)}/hr</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Agency:</Table.Cell>
										<Table.Cell>{shownMember.agency ? shownMember.agency.displayname : 'Free' }</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Tradability:</Table.Cell>
										<Table.Cell>{shownMember.tradable ? 'Tradable' : 'Untradable' }</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Current Job:</Table.Cell>
										<Table.Cell>{shownMember.job ? shownMember.job.name : 'None'}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell />
										<Table.Cell>{shownMember.job ? remainTime.remainTimeText(serverTime, shownMember.job.endTime, 'Member') : null}</Table.Cell>
									</Table.Row>
								</Table.Body>
							</Table>
							<AssignmentForm shownMember={shownMember} style={assignmentFormStyle} />
							<ButtonAssignmentCollect shownMember={shownMember} style={assignmentCollectStyle} setDimmerOn={setDimmerOn}/>
							<ButtonAssignmentCancel shownMember={shownMember} style={assignmentCancelStyle} />
						</Grid.Column>
					</Grid.Row>
					<Grid.Row columns={16} only='computer tablet'>
						<Grid.Column computer={5} tablet={7}>
							<img src={shownMember.pic_link} alt="profile pic" />
						</Grid.Column>
						<Grid.Column computer={11} tablet={9}>
							<Table striped>
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
										<Table.Cell>Fanbase Size:</Table.Cell>
										<Table.Cell>{shownMember.fanSize}</Table.Cell>
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
										<Table.Cell>Tradability:</Table.Cell>
										<Table.Cell>{shownMember.tradable ? 'Tradable' : 'Untradable' }</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Current Job:</Table.Cell>
										<Table.Cell>{shownMember.job ? shownMember.job.name : 'None'}</Table.Cell>
										<Table.Cell>{shownMember.job ? remainTime.remainTimeText(serverTime, shownMember.job.endTime, 'Member') : null}</Table.Cell>
										<Table.Cell />
									</Table.Row>
								</Table.Body>
							</Table>
							<AssignmentForm shownMember={shownMember} style={assignmentFormStyle} />
							<ButtonAssignmentCollect shownMember={shownMember} style={assignmentCollectStyle} setDimmerOn={setDimmerOn}/>
							<ButtonAssignmentCancel shownMember={shownMember} style={assignmentCancelStyle} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<BidForm shownMember={shownMember} style={bidFormStyle} />
				<OfferForm shownMember={shownMember} style={offerFormStyle} />
				<PayriseForm shownMember={shownMember} style={payriseFormStyle} />
				<ButtonLateSign shownMember={shownMember} style={lateSignButtonStyle} />
				<ButtonRelease shownMember={shownMember} style={releaseButtonStyle} />
				<Dimmer active={dimmerOn} page>
					<Message color='orange'>
						Processing...
					</Message>
				</Dimmer>
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