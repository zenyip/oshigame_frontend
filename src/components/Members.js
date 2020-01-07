import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
	sortMembersByDefault,
	sortMembersByEnglishName,
	sortMembersByGen,
	sortMembersByTeam,
	sortMembersByKatakana,
	sortMembersByHometown,
	sortMembersByValue,
	sortMembersByFanSize
} from '../reducers/membersReducer'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import { Grid, Button, Select, Image, Icon, Reveal, Responsive } from 'semantic-ui-react'

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

const sortList = ['Default', 'Team', 'Name (Katakana)', 'Name (English)', 'Generation', 'Hometown', 'Value', 'Fan Size']
const sortOptions = sortList.map(m => {return { key: m, text: m, value: m }})

const Members = props => {

	const [teamFilter, setTeamFilter] = useState('All Teams')
	const [genFilter, setGenFilter] = useState('All Generations')
	const [hometownFilter, setHometownFilter] = useState('Any Hometown')
	const [agencyFilter, setAgencyFilter] = useState('All Agency')
	const [currentSort, setCurrentSort] = useState('Default')

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

		const doSort = (method) => {
			switch(method) {
				case 'Default':{
					props.sortMembersByDefault()
					setCurrentSort(method)
					break
				}
				case 'Team':{
					props.sortMembersByTeam()
					setCurrentSort(method)
					break
				}
				case 'Name (Katakana)':{
					props.sortMembersByKatakana()
					setCurrentSort(method)
					break
				}
				case 'Name (English)':{
					props.sortMembersByEnglishName()
					setCurrentSort(method)
					break
				}
				case 'Generation':{
					props.sortMembersByGen()
					setCurrentSort(method)
					break
				}
				case 'Hometown':{
					props.sortMembersByHometown()
					setCurrentSort(method)
					break
				}
				case 'Value':{
					props.sortMembersByValue()
					setCurrentSort(method)
					break
				}
				case 'Fan Size':{
					props.sortMembersByFanSize()
					setCurrentSort(method)
					break
				}
				default: {}
			}
		}

        const memberSpan = (s) => {
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
			const profilePicStyle = (team, hidden) => {
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

				const opacity = hidden ? '0.3' : '1'

				return ({
					display: 'block',
					opacity: opacity,
					borderTop: `${s}px solid ${teamColor1}`,
					borderLeft: `${s}px solid ${teamColor1}`,
					borderBottom: `${s}px solid ${teamColor2}`,
					borderRight: `${s}px solid ${teamColor2}`
				})
			}
			const revealTextStyle = {
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				fontSize: '16px',
				lineHeight: '1.5em',
				textAlign: 'center',
				color: '#000000',
				textShadow: '2px 2px 2px #FFFFFF'
			}
			const agencyName = (member) => {
				if (member.agency) {
					return member.agency.displayname
				} else {
					return 'No Agency'
				}
			}
			const quickInfo = (m) => {
				if (s === 5) {
					return (
						<Grid.Row>
							<div>{m.name_e.firstname} {m.name_e.lastname}</div>
							<div><Icon name='dollar sign' />{m.value}{' / '}<Icon name='users' />{m.fanSize}</div>
						</Grid.Row>
					)
				}
				if (s === 3) {
					return (
						<Grid.Row only='mobile'>
							<div>{m.name_e.firstname}</div>
							<div>{m.name_e.lastname}</div>
							<div><Icon name='dollar sign' />{m.value}</div>
							<div><Icon name='users' />{m.fanSize}</div>
						</Grid.Row>
					)
				}
				return
			}
			if (filteredMembers.length > 0) {
				return filteredMembers.map(m => {
					return (
						<Grid.Column key={m.id}>
							<Grid.Row>
								<Link to={`/members/${m.id}`}>
									<div>
										<Responsive minWidth={Responsive.onlyTablet.minWidth}>
											<Reveal animated='fade' instant>
												<Reveal.Content visible>
													<Image fluid src={m.pic_link} alt={`${m.name_e.firstname} ${m.name_e.lastname}`} height="200" style={profilePicStyle(m.team, false)} />
												</Reveal.Content>
												<Reveal.Content hidden>
													<Image fluid src={m.pic_link} alt={`${m.name_e.firstname} ${m.name_e.lastname}`} height="200" style={profilePicStyle(m.team, true)} />
													<div style={revealTextStyle} >
														{m.name_j}
														<br />
														in
														<br />
														{agencyName(m)}
														<br />
														Value: {m.value}
														<br />
														Fans: {m.fanSize}
													</div>
												</Reveal.Content>
											</Reveal>
										</Responsive>
										<Responsive {...Responsive.onlyMobile} >
											<Image fluid src={m.pic_link} alt={`${m.name_e.firstname} ${m.name_e.lastname}`} height="200" style={profilePicStyle(m.team, false)} />
										</Responsive>
									</div>
								</Link>
							</Grid.Row>
							{quickInfo(m)}
						</Grid.Column>
					)
				})
			}
			return <div> No Matching Member</div>
		}

		return (
			<div>
				<h2>Members</h2>
				<Grid columns={16}>
					<Grid.Row only='computer tablet'>
						<Grid.Column tablet={4} computer={2} verticalAlign='middle'>
							Sorting by :
						</Grid.Column>
						<Grid.Column tablet={12} computer={14}>
							<Button onClick={props.sortMembersByDefault} content='Default'/>
							<Button onClick={props.sortMembersByTeam} content='Team'/>
							<Button onClick={props.sortMembersByKatakana} content='Name (Katakana)'/>
							<Button onClick={props.sortMembersByEnglishName} content='Name (English)'/>
							<Button onClick={props.sortMembersByGen} content='Generation'/>
							<Button onClick={props.sortMembersByHometown} content='Hometown'/>
							<Button onClick={props.sortMembersByValue} content='Value'/>
							<Button onClick={props.sortMembersByFanSize} content='Fan Size'/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row only='mobile'>
					<Grid.Column width={5} verticalAlign='middle'>
							Sorting by :
						</Grid.Column>
						<Grid.Column width={11}>
							<Select
								options={sortOptions}
								onChange={(e, data) => doSort(data.value)}
								value={currentSort}
							/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column mobile={5} tablet={4} computer={2} verticalAlign='middle'>
							Filters :
						</Grid.Column>
						<Grid.Column mobile={11} tablet={12} computer={14}>
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
					<Grid.Row only='tablet computer'>
						{memberSpan(5)}
					</Grid.Row>
				</Grid>
				<Grid columns={3}>
					<Grid.Row only='mobile'>
						{memberSpan(3)}
					</Grid.Row>
				</Grid>
			</div>
		)
	} else {
		return (
			<Loading />
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
	sortMembersByValue,
	sortMembersByFanSize
}

export default connect(mapStateToProps, mapDispatchToProps)(Members)