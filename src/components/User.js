import React from 'react'
import negotiationsService from '../services/negotiations'
import { setUserByToken } from '../reducers/userReducer'
import { initializeMembers } from '../reducers/membersReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

const User = (props) => {
	const { shownUser, members} = props

	const headstyle = {
		paddingTop: "20px"
	}

	if (shownUser) {

		const admin = (u) => u.admin ?
			<div>ADMIN</div> :
			null

		const oshimenList = (u) => {
			const remainTime = (endTime) => {
				const endTimeMS = Date.parse(endTime)
				const currentTimeMS = Date.parse(props.serverTime)
				const remainTimeMS = endTimeMS - currentTimeMS
				if (remainTimeMS > 0) {
					let remainTimeS = Math.floor(remainTimeMS / 1000)
					const remainHrs = Math.floor(remainTimeS / 3600)
					remainTimeS = remainTimeS % 3600
					const remainMins = Math.floor(remainTimeS / 60)
					const remainS = remainTimeS % 60
					return `will be back in ${remainHrs} hr ${remainMins} min ${remainS} s`
				} else {
					return 'is ready to collect'
				}
			}

			return (u.oshimens.length > 0 ?
				u.oshimens.map(m => (
					<div key={m.id}>
						<Link to={`/members/${m.id}`}>
							{m.nickname}
						</Link>
						{m.job ? ` on ${m.job.name} and ${remainTime(m.job.endTime)}` : ' is waiting for assignments'}
					</div>
				)) :
				'none'
			)
		}

		const negotiationList = (u) => {
			if (u.negotiations.length > 0) {
				const biddingList = u.negotiations.filter(n => n.tradeType === 'bid')
				const biddingSpan = () => {
					if (biddingList.length === 0) {
						return null
					} else {
						const digestedBiddingList = biddingList.map(n => {
							const member = members.filter(m => m.id === n.member)
							const name = member[0].nickname
							return `${name} at ${n.bid}`
						})
						return (
							<div>
								biddings: {digestedBiddingList.join(', ')}
							</div>
						)
					}
				}
				const releasedList = u.negotiations.filter(n => n.tradeType === 'release')
				const releasedSpan = () => {
					if (releasedList.length === 0) {
						return null
					} else {
						const digestedReleasedList = releasedList.map(n => {
							const member = members.filter(m => m.id === n.member)
							const name = member[0].nickname
							return `${name} at ${n.bid}`
						})
						return (
							<div>
								released: {digestedReleasedList.join(', ')}
							</div>
						)
					}
				}
				const forcedList = u.negotiations.filter(n => n.tradeType === 'force')
				const forcedSpan = () => {
					if (forcedList.length === 0) {
						return null
					} else {
						const digestedForcedList = forcedList.map(n => {
							const member = members.filter(m => m.id === n.member)
							const name = member[0].nickname
							return n.recipient.toString().includes(shownUser.id) ? `LOST ${name} at ${n.bid}` : `SIGNED ${name} at ${n.bid}`
						})
						return (
							<div>
								forced trades: {digestedForcedList.join(', ')}
							</div>
						)
					}
				}
				const sentOfferList = u.negotiations.filter(n => n.tradeType === 'offer' && n.applicant.toString().includes(shownUser.id))
				const sentOfferSpan = () => {
					if (sentOfferList.length === 0) {
						return null
					} else {
						const digestedSentOfferList = sentOfferList.map(n => {
							const member = members.filter(m => m.id === n.member)
							const name = member[0].nickname
							return `${name} at ${n.bid}`
						})
						return (
							<div>
								sent offers: {digestedSentOfferList.join(', ')}
							</div>
						)
					}
				}
				let receivedOfferList = u.negotiations.filter(n => n.tradeType === 'offer' && n.recipient.toString().includes(shownUser.id))
				const receivedOffers = () => {
					const displayname = (applicant) => {
						const displaynames = props.displaynames.filter(n => n.id === applicant)
						return displaynames[0].displayname
					}
					const nickname = (member) => {
						const nicknames = props.members.filter(m => m.id === member)
						return nicknames[0].nickname
					}
					const handleAccept = async (negotiationId) => {
						try {
							await negotiationsService.acceptOffer(negotiationId, props.token)
							await props.setUserByToken(props.token)
							await props.initializeMembers()
							props.setNotification({ content: 'offer is accepted', colour: 'green' }, 5)
						} catch (exception) {
							props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
						}
					}
					const handleReject = async (negotiationId) => {
						try {
							await negotiationsService.rejectOffer(negotiationId, props.token)
							await props.setUserByToken(props.token)
							props.setNotification({ content: 'offer is rejected', colour: 'green' }, 5)
						} catch (exception) {
							props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
						}
					}
					if (receivedOfferList.length === 0) {
						return null
					} else {
						return (
							<div>
								<div>RECEIVED OFFERS</div>
								{receivedOfferList.map(n => (
									<div key={n.id}>
										<Link to={`/members/${n.member}`}>
											{nickname(n.member)}
										</Link>
										{` at ${n.bid} from ${displayname(n.applicant)} `}
										<Button content='Accept' color='violet' onClick={() => handleAccept(n.id)} />
										<Button content='Reject' color='pink' onClick={() => handleReject(n.id)} />
									</div>
								))}
							</div>
						)
					}
				}
				return (
					<div>
						{biddingSpan()}
						{sentOfferSpan()}
						{receivedOffers()}
						{forcedSpan()}
						{releasedSpan()}
					</div>
				)
			} else {
				return 'none'
			}
		}

		return (
			<div>
				<h3 style={headstyle}>{shownUser.username}</h3>
				<div>displayname: {shownUser.displayname}</div>
				<div>assest: {shownUser.assest}</div>
				{admin(shownUser)}
				<div>negotiations:</div>
				<div>{negotiationList(shownUser)}</div>
				<div>oshimens:</div>
				<div>{oshimenList(shownUser)}</div>
			</div>
		)
	} else {
		return <div>loading...</div>
	}
}

const mapStateToProps = (state) => {
	return {
		members: state.members,
		displaynames: state.displaynames,
		token: state.token,
		serverTime: state.serverTime
	}
}

const mapDispatchToProps = {
	setUserByToken,
	initializeMembers,
	setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(User)