import React, { useState } from 'react'
import { addNewMember, editExistingMember } from '../reducers/membersReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button, Select, Radio } from 'semantic-ui-react'
import { connect } from 'react-redux'

const genList = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', 'D1', 'Sis', 'T8', 'D2', 'TW', '16th', 'D3']
const genOptions = genList.map(g => {return { key: g, text: g, value: g }})
const teamList = ['Team A', 'Team K', 'Team B', 'Team 4', 'Team 8']
const teamOptions1 = teamList.map(t => {return { key: t, text: t, value: t }})
const teamOptions2 = teamList.concat('No Kennin').map(t => {return { key: t, text: t, value: t }})
const prefectureList = [
	'Hokkaido', 'Aomori', 'Akita', 'Iwate', 'Yamagata', 'Miyagi', 'Fukushima',
	'Ibaraki', 'Tochigi', 'Gunma', 'Saitama', 'Chiba', 'Tokyo', 'Kanagawa', 'Niigata', 'Yamanashi',
	'Aichi', 'Shizuoka', 'Gifu', 'Mie', 'Toyama', 'Ishikawa', 'Fukui', 'Nagano',
	'Osaka', 'Kyoto', 'Hyogo', 'Wakayama', 'Nara', 'Shiga',
	'Tottori', 'Shimane', 'Okayama', 'Hiroshima', 'Yamaguchi', 'Tokushima', 'Kagawa', 'Ehime', 'Kochi',
	'Fukuoka', 'Saga', 'Nagasaki', 'Kumamoto', 'Oita', 'Miyazaki', 'Kagoshima', 'Okinawa',
	'Taiwan'
]
const hometownOptions = prefectureList.map(p => {return { key: p, text: p, value: p }})

const MemberForm = (props) => {
	const memberOptions = props.members.map(m => {return { key: m.id, text: m.name_j, value: m.id }})

	const [firstname_e, setFirstname_e] = useState('')
	const [lastname_e, setLastname_e] = useState('')
	const [name_j, setName_j] = useState('')
	const [firstname_k, setFirstname_k] = useState('')
	const [lastname_k, setLastname_k] = useState('')
	const [nickname, setNickname] = useState('')
	const [birthday, setBirthday] = useState('')
	const [hometown, setHometown] = useState('')
	const [generation, setGeneration] = useState('')
	const [pic_link, setPic_link] = useState('')
	const [pic_forCert, setPic_forCert] = useState('')
	const [team1, setTeam1] = useState(null)
	const [team2, setTeam2] = useState(null)
	const [current, setCurrent] = useState(true)
	const [kks, setKks] = useState(false)

	const [editMemberID, setEditMemberID] = useState('')

	const resetForm = () => {
		setFirstname_e('')
		setLastname_e('')
		setName_j('')
		setFirstname_k('')
		setLastname_k('')
		setNickname('')
		setBirthday('')
		setHometown('')
		setGeneration('')
		setPic_link('')
		setPic_forCert('')
		setTeam1('')
		setTeam2(null)
		setCurrent(true)
		setKks(false)
		setEditMemberID('')
	}

	const handleAddMember = async (event) => {
		event.preventDefault()
		try {
			let teams = [team1]
			if (team2 !== 'No Kennin') {
				teams = teams.concat(team2)
			}
			const newMember = {
				'name_e': {
					'firstname': firstname_e,
					'lastname': lastname_e
				},
				name_j,
				'name_k': {
					'firstname': firstname_k,
					'lastname': lastname_k
				},
				nickname,
				birthday,
				hometown,
				generation,
				pic_link,
				pic_forCert,
				'team': teams,
				current,
				kks
			}
			const addedMember = await props.addNewMember(newMember, props.token)
			resetForm()
			props.setNotification({ content: `member "${addedMember.name_j}" is added`, colour: 'green' })
		} catch (exception) {
			props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
		}
	}

	const handleEdit = async (event) => {
		event.preventDefault()
		try {
			let teams = [team1]
			if (team2 !== 'No Kennin') {
				teams = teams.concat(team2)
			}
			const updateMember = {
				'name_e': {
					'firstname': firstname_e,
					'lastname': lastname_e
				},
				name_j,
				'name_k': {
					'firstname': firstname_k,
					'lastname': lastname_k
				},
				nickname,
				birthday,
				hometown,
				generation,
				pic_link,
				pic_forCert,
				'team': teams,
				current,
				kks
			}
			const editedMember = await props.editExistingMember(editMemberID, updateMember, props.token)
			resetForm()
			props.setNotification({ content: `member "${editedMember.name_j}" is edited`, colour: 'green' })
		} catch (exception) {
			props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
		}
	}

	const lookupMember = props.members.find(m => m.id === editMemberID)

	const checkLink = (link) => link ? link : ''

	const handleCopy = (event) => {
		event.preventDefault()
		setFirstname_e(lookupMember.name_e.firstname)
		setLastname_e(lookupMember.name_e.lastname)
		setName_j(lookupMember.name_j)
		setFirstname_k(lookupMember.name_k.firstname)
		setLastname_k(lookupMember.name_k.lastname)
		setNickname(lookupMember.nickname)
		setBirthday(lookupMember.birthday.substring(0, 10))
		setHometown(lookupMember.hometown)
		setGeneration(lookupMember.generation.name)
		setPic_link(checkLink(lookupMember.pic_link))
		setPic_forCert(checkLink(lookupMember.pic_forCert))
		setTeam1(lookupMember.team[0])
		setTeam2(lookupMember.team[1] ? lookupMember.team[1] : 'No Kennin')
		setCurrent(lookupMember.current)
		setKks(lookupMember.kks)
	}

	return (
		<div>
			<h2>New Member</h2>
			<Form onSubmit={handleCopy}>
				<Form.Group>
					<Form.Field
						inline
						control={Select}
						label='Copy Existing Member'
						options={memberOptions}
						placeholder='Existing Members'
						onChange={(e, data) => setEditMemberID(data.value)}
						value={editMemberID}
					/>
					<Button type="submit">COPY</Button>
				</Form.Group>
			</Form>
			<Form onSubmit={handleAddMember}>
				<Form.Group widths='equal'>
					<Form.Input
						label='First name (English)'
						placeholder='First name'
						onChange={({ target }) => setFirstname_e(target.value)}
						value={firstname_e}
					/>
					<Form.Input
						label='Last name (English)'
						placeholder='Last name'
						onChange={({ target }) => setLastname_e(target.value)}
						value={lastname_e}
					/>
				</Form.Group>
				<Form.Input
					label='Full name (Japanese Kanji)'
					placeholder='お名前'
					onChange={({ target }) => setName_j(target.value)}
					value={name_j}
				/>
				<Form.Group widths='equal'>
					<Form.Input
						label='First name (Katakana)'
						placeholder='ナマエ'
						onChange={({ target }) => setFirstname_k(target.value)}
						value={firstname_k}
					/>
					<Form.Input
						label='Last name (Katakana)'
						placeholder='ミョウジ'
						onChange={({ target }) => setLastname_k(target.value)}
						value={lastname_k}
					/>
				</Form.Group>
				<Form.Group widths='equal'>
					<Form.Input
						label='Nickname'
						placeholder='Nickname'
						onChange={({ target }) => setNickname(target.value)}
						value={nickname}
					/>
					<Form.Input
						label='Birthday'
						placeholder='YYYY-MM-DD'
						onChange={({ target }) => setBirthday(target.value)}
						value={birthday}
					/>
					<Form.Field
						control={Select}
						label='Hometown'
						options={hometownOptions}
						placeholder='Hometown'
						onChange={(e, data) => setHometown(data.value)}
						value={hometown}
					/>
				</Form.Group>
				<Form.Group widths='equal'>
					<Form.Input
						label='Profile Picture Link'
						placeholder='https://somewhere.jpg'
						onChange={({ target }) => setPic_link(target.value)}
						value={pic_link}
					/>
					<Form.Input
						label='Certificate Picture Link'
						placeholder='https://somewhere.jpg'
						onChange={({ target }) => setPic_forCert(target.value)}
						value={pic_forCert}
					/>
				</Form.Group>
				<Form.Group widths='equal'>
					<Form.Field
						control={Select}
						label='Generation'
						options={genOptions}
						placeholder='Generation'
						onChange={(e, data) => setGeneration(data.value)}
						value={generation}
					/>
					<Form.Field
						control={Select}
						label='Team (Main)'
						options={teamOptions1}
						placeholder='Team (Main)'
						onChange={(e, data) => setTeam1(data.value)}
						value={team1}
					/>
					<Form.Field
						control={Select}
						label='Team (Kennin)'
						options={teamOptions2}
						placeholder='Team (Kennin)'
						onChange={(e, data) => setTeam2(data.value)}
						value={team2}
					/>
				</Form.Group>
				<Form.Group inline>
					<label>Membership</label>
					<Form.Field
						control={Radio}
						name='membership'
						label='Current'
						checked={current === true}
						onChange={() => setCurrent(true)}
					/>
					<Form.Field
						control={Radio}
						name='membership'
						label='Graduated'
						checked={current === false}
						onChange={() => setCurrent(false)}
					/>
				</Form.Group>
				<Form.Group inline>
					<label>Status</label>
					<Form.Field
						control={Radio}
						name='kenkyosen'
						label='Regular'
						checked={kks === false}
						onChange={() => setKks(false)}
					/>
					<Form.Field
						control={Radio}
						name='kenkyosen'
						label='Kenkyosen'
						checked={kks === true}
						onChange={() => setKks(true)}
					/>
				</Form.Group>
				<Button type="submit" color='pink'>ADD MEMBER</Button>
				<Button onClick={handleEdit}>EDIT MEMBER</Button>
			</Form>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
		members: state.members
	}
}

const mapDispatchToProps = {
	setNotification,
	addNewMember,
	editExistingMember
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberForm)