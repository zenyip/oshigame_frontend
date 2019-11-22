import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
	sortMembersByDefault,
	sortMembersByEnglishName,
	sortMembersByGen,
	sortMembersByTeam,
	sortMembersByKatakana,
	sortMembersByHometown,
	sortMembersByValue
} from '../reducers/membersReducer'
import { Link } from 'react-router-dom'
import { Grid, Button, Select } from 'semantic-ui-react'

const teamList = ['All Teams', 'Team A', 'Team K', 'Team B', 'Team 4', 'Team 8']
const teamOptions = teamList.map(t => {return { key: t, text: t, value: t }})

const genList = ['All Generations', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', 'D1', 'Sis', 'T8', 'D2', 'TW', '16th', 'D3']
const genOptions = genList.map(g => {return { key: g, text: g, value: g }})

const hometownList = [
	'Any Hometown',
	'Hokkaido', 'Aomori', 'Akita', 'Iwate', 'Yamagata', 'Miyagi', 'Fukushima',
	'Ibaraki', 'Tochigi', 'Gunma', 'Saitama', 'Chiba', 'Tokyo', 'Kanagawa', 'Niigata', 'Yamanashi',
	'Aichi', 'Shizuoka', 'Gifu', 'Mie', 'Toyama', 'Ishikawa', 'Fukui', 'Nagano',
	'Osaka', 'Kyoto', 'Hyogo', 'Wakayama', 'Nara', 'Shiga',
	'Tottori', 'Shimane', 'Okayama', 'Hiroshima', 'Yamaguchi', 'Tokushima', 'Kagawa', 'Ehime', 'Kochi',
	'Fukuoka', 'Saga', 'Nagasaki', 'Kumamoto', 'Oita', 'Miyazaki', 'Kagoshima', 'Okinawa',
	'Taiwan'
]
const hometownOptions = hometownList.map(p => {return { key: p, text: p, value: p }})

let agencyList = ['All Agency', 'Not Free', 'Free']
let agencyOptions = agencyList.map(a => {return { key: a, text: a, value: a }})

const Members = props => {

	const [teamFilter, setTeamFilter] = useState('All Teams')
	const [genFilter, setGenFilter] = useState('All Generations')
	const [hometownFilter, setHometownFilter] = useState('Any Hometown')
	const [agencyFilter, setAgencyFilter] = useState('All Agency')

	if (props.user) {
		agencyList = ['All Agency', 'Under Your Agency', 'Signed by Others', 'Not Free', 'Free']
		agencyOptions = agencyList.map(a => {return { key: a, text: a, value: a }})
	}

	if (props.members.length > 0) {
		const resetFilters = () => {
			setTeamFilter('All Teams')
			setGenFilter('All Generations')
			setHometownFilter('Any Hometown')
			setAgencyFilter('All Agency')
		}

        const memberSpan = () => {
			const filteringByAgency = (members, filter) => {
				switch(filter) {
					case 'Under Your Agency':{
						return members.filter(m => m.agency && m.agency.id.toString().includes(props.user.id))
					}
					case 'Signed by Others': {
						return members.filter(m => m.agency && !m.agency.id.toString().includes(props.user.id))
					}
					case 'Not Free': {
						return members.filter(m => m.agency)
					}
					case 'Free': {
						return members.filter(m => m.agency == null)
					}
					default: {
						return members
					}
				}
			}

			let filteredMembers = props.members
			filteredMembers = teamFilter === 'All Teams' ? filteredMembers : filteredMembers.filter(m => m.team.includes(teamFilter))
			filteredMembers = genFilter === 'All Generations' ? filteredMembers : filteredMembers.filter(m => m.generation.name === genFilter)
			filteredMembers = hometownFilter === 'Any Hometown' ? filteredMembers : filteredMembers.filter(m => m.hometown === hometownFilter)
			filteredMembers = filteringByAgency(filteredMembers, agencyFilter)
			const borderStyle = (team) => {
				const colorCheck = (checkTeam) => {
					switch(checkTeam) {
						case 'Team A': {
							return '#ff66ff'
						}
						case 'Team K': {
							return '#00cc00'
						}
						case 'Team B': {
							return '#3399ff'
						}
						case 'Team 4': {
							return 'Yellow'
						}
						case 'Team 8': {
							return '#000066'
						}
						default: {
							return 'black'
						}
					}
				}
				const teamColor1 = colorCheck(team[0])
				const teamColor2 = team.length > 1 ? colorCheck(team[1]) : teamColor1

				return ({
					borderTop: `5px solid ${teamColor1}`,
					borderLeft: `5px solid ${teamColor1}`,
					borderBottom: `5px solid ${teamColor2}`,
					borderRight: `5px solid ${teamColor2}`
				})
			}
			if (filteredMembers.length > 0) {
				return filteredMembers.map(m => {
					return (
						<Grid.Column key={m.id}>
							<Grid.Row>
								<Link to={`/members/${m.id}`}>
									<img src={m.pic_link} alt={`${m.name_e.firstname} ${m.name_e.lastname}`} height="200" style={borderStyle(m.team)} />
								</Link>
							</Grid.Row>
							<Grid.Row>
								<p>{m.name_e.firstname} {m.name_e.lastname} - V:{m.value} </p>
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
						<Grid.Column width={2} verticalAlign='middle'>
							Sorting by :
						</Grid.Column>
						<Grid.Column width={14}>
							<Button onClick={props.sortMembersByDefault} content='Default'/>
							<Button onClick={props.sortMembersByTeam} content='Team'/>
							<Button onClick={props.sortMembersByKatakana} content='Name (Katakana)'/>
							<Button onClick={props.sortMembersByEnglishName} content='Name (English)'/>
							<Button onClick={props.sortMembersByGen} content='Generation'/>
							<Button onClick={props.sortMembersByHometown} content='Hometown'/>
							<Button onClick={props.sortMembersByValue} content='Value'/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={2} verticalAlign='middle'>
							Filters :
						</Grid.Column>
						<Grid.Column width={14}>
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
								options={hometownOptions}
								onChange={(e, data) => setHometownFilter(data.value)}
								value={hometownFilter}
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
				<Grid columns={5}>
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
	sortMembersByKatakana,
	sortMembersByHometown,
	sortMembersByValue
}

export default connect(mapStateToProps, mapDispatchToProps)(Members)