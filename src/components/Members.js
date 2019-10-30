import React, { useState } from 'react'
import { connect } from 'react-redux'
import { sortMembersByDefault, sortMembersByEnglishName, sortMembersByGen, sortMembersByTeam, sortMembersByKatakana } from '../reducers/membersReducer'
import { Link } from 'react-router-dom'
import { Grid, Button, Select } from 'semantic-ui-react'

const teamList = ['All Teams', 'Team A', 'Team K', 'Team B', 'Team 4', 'Team 8']
const teamOptions = teamList.map(t => {return { key: t, text: t, value: t }})

const genList = ['All Generations', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', 'D1', 'Sis', 'T8', 'D2', 'TW', '16th', 'D3']
const genOptions = genList.map(g => {return { key: g, text: g, value: g }})

const agencyList = ['All Agency', 'Free Only']
const agencyOptions = agencyList.map(a => {return { key: a, text: a, value: a }})

const Members = props => {

	const [teamFilter, setTeamFilter] = useState('All Teams')
	const [genFilter, setGenFilter] = useState('All Generations')
	const [agencyFilter, setAgencyFilter] = useState('All Agency')

	if (props.members.length > 0) {
		const resetFilters = () => {
			setTeamFilter('All Teams')
			setGenFilter('All Generations')
			setAgencyFilter('All Agency')
		}

        const memberSpan = () => {
			let filteredMembers = props.members
			filteredMembers = teamFilter === 'All Teams' ? filteredMembers : filteredMembers.filter(m => m.team.includes(teamFilter))
			filteredMembers = genFilter === 'All Generations' ? filteredMembers : filteredMembers.filter(m => m.generation.name === genFilter)
			filteredMembers = agencyFilter === 'All Agency' ? filteredMembers : filteredMembers.filter(m => m.agency == null)
			if (filteredMembers.length > 0) {
				return filteredMembers.map(m => {
					return (
						<Grid.Column key={m.id}>
							<Grid.Row>
								<Link to={`/members/${m.id}`}>
									<img src={m.pic_link} alt={`${m.name_e.firstname} ${m.name_e.lastname}`} height="200" />
								</Link>
							</Grid.Row>
							<Grid.Row>
								<p>{m.name_e.firstname} {m.name_e.lastname}</p>
							</Grid.Row>
						</Grid.Column>
					)
				})
			}
			return <div> No Matching Member</div>
		}

		return (
			<div>
				<h2>Members</h2>
				<Grid>
					<Grid.Row>
						<Grid.Column width={2} textAlign='middle'>
							Sorting by :
						</Grid.Column>
						<Grid.Column width={12}>
							<Button onClick={props.sortMembersByDefault} content='Default'/>
							<Button onClick={props.sortMembersByTeam} content='Team'/>
							<Button onClick={props.sortMembersByKatakana} content='Name (Katakana)'/>
							<Button onClick={props.sortMembersByEnglishName} content='Name (English)'/>
							<Button onClick={props.sortMembersByGen} content='Generation'/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={2} textAlign='middle'>
							Filters :
						</Grid.Column>
						<Grid.Column width={12}>
							<Select
								options={teamOptions}
								onChange={(e, data) => setTeamFilter(data.value)}
								value={teamFilter}
							/>
							<Select
								options={genOptions}
								onChange={(e, data) => setGenFilter(data.value)}
								value={genFilter}
							/>
							<Select
								options={agencyOptions}
								onChange={(e, data) => setAgencyFilter(data.value)}
								value={agencyFilter}
							/>
							<Button onClick={resetFilters} content='Clear'/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				<Grid columns={props.members.length}>
					{memberSpan()}
				</Grid>
			</div>
		)
	} else {
		return (
			<div>
				Loading...
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		members: state.members,
		user: state.user
	}
}

const mapDispatchToProps = {
	sortMembersByDefault,
	sortMembersByGen,
	sortMembersByTeam,
	sortMembersByEnglishName,
	sortMembersByKatakana
}

export default connect(mapStateToProps, mapDispatchToProps)(Members)