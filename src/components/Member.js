import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { bidding } from '../reducers/negotiationsReducer'
import { setUserByToken } from '../reducers/userReducer'
import { updateMemberBid } from '../reducers/membersReducer'
import { connect } from 'react-redux'
import { Form, Button, Grid, Table } from 'semantic-ui-react'

const Member = (props) => {
	const { shownMember } = props
	const [bid, setBid] = useState('')

	const inlineStyle = {
		display: 'inline'
	}

	const bidFormStyle = props.phrase === 'negotiation' && props.user ? { display: 'inline' } : { display: 'none'}

	useEffect (() => {
		if (shownMember) {
			setBid(shownMember.negotiation ? shownMember.negotiation.bid + 10 : shownMember.value)
		}
	}, [shownMember])

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
					const placedBid = await props.bidding(newBid, props.token)
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
				<Link to={'/members'}>
                    <Button>back</Button>
                </Link>
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
	bidding,
	setUserByToken,
	updateMemberBid
}

export default connect(mapStateToProps, mapDispatchToProps)(Member)