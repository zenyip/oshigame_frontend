import React, { useState } from 'react'
import TopBids from './TopBids'
import TopValues from './TopValues'
import TopPopularity from './TopPopularity'
import Banner from './Banner'
//import { changePhrase } from '../reducers/phraseReducer'
import { addNotice, removeNotice, updateNotice } from '../reducers/noticesReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Form, Button, Select, Grid } from 'semantic-ui-react'

//const phraseList = ['general', 'negotiation']
//const phraseOptions = phraseList.map(p => {return { key: p, text: p, value: p }})

const Home = (props) => {
	//const [newPhrase, setNewPhrase] = useState(null)
	const [newNotice, setNewNotice] = useState('')
	const [shownList, setShownList] = useState('FAN')
	
	const listOptions = [
		{ key: 'list1', text: 'Most Expensive Members', value: 'VALUE' },
		{ key: 'list2', text: 'Most Popular Members', value: 'FAN' },
		{ key: 'list3', text: 'Current Top 10 Bids', value: 'BID' }
	]

	/*const phraseChanger = () => {
		const handlePhraseChange = async (event) => {
			event.preventDefault()
			try {
				const phrase = {
					'phrase': newPhrase
				}
				const changedPhrase = await props.changePhrase(phrase, props.token)
				setNewPhrase(null)
				props.setNotification({ content: `phrase is changed to "${changedPhrase.phrase}"`, colour: 'green' }, 5)
			} catch (exception) {
				props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
			}
		}
		if (props.user) {
			if (props.user.admin) {
				return (
					<Form onSubmit={handlePhraseChange}>
						<Form.Field
							control={Select}
							label='Change Phrase to: '
							options={phraseOptions}
							placeholder='new phrase'
							onChange={(e, data) => setNewPhrase(data.value)}
							value={newPhrase}
						/>
						<Button type="submit">Change</Button>
					</Form>
				)
			} else {
				return null
			}
		} else {
			return null
		}
	}*/

	const notices = () => {
		const noticeList = () => {
			const handleEditNotice = async (id) => {
				try {
					await props.updateNotice(id, newNotice, props.token)
					setNewNotice('')
					props.setNotification({ content: `Notice Updated`, colour: 'green' }, 5)
				} catch (exception) {
					props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
				}
			}
			const handleRemoveNotice = async (id) => {
				try {
					await props.removeNotice(id, props.token)
					props.setNotification({ content: `Notice Removed`, colour: 'green' }, 5)
				} catch (exception) {
					props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
				}
			}
			if (props.user) {
				if (props.user.admin) {
					return props.notices.map(n => (
						<div key={n.id}>
							<Button onClick={() => handleEditNotice(n.id)}>
								Edit
							</Button>
							<Button onClick={() => handleRemoveNotice(n.id)} color='violet'>
								Remove
							</Button>
							{`${props.notices.indexOf(n) + 1}. ${n.content}`}
						</div>
					))
				}
			}
			return props.notices.map(n => <div key={n.id}>{`${props.notices.indexOf(n) + 1}. ${n.content}`}</div>)
		}
		const noticeForm = () => {
			const handleNewNotice = async (event) => {
				event.preventDefault()
				try {
					await props.addNotice(newNotice, props.token)
					setNewNotice('')
					props.setNotification({ content: `New Notice Posted`, colour: 'green' }, 5)
				} catch (exception) {
					props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
				}
			}
			if (props.user) {
				if (props.user.admin) {
					return (
						<Form onSubmit={handleNewNotice}>
						<Form.Input
							label='New/Updated Notice:'
							placeholder={newNotice}
							onChange={({ target }) => setNewNotice(target.value)}
							value={newNotice}
						/>
						<Button type="submit" color='pink'>
							Post New Notice
						</Button>
					</Form>
					)
				} else {
					return null
				}
			} else {
				return null
			}
		}
		return (
			<div>
				<h3>Current Notes</h3>
				{noticeList()}
				{noticeForm()}
			</div>
		)
	}

	const list = () => {
		switch(shownList) {
			case 'VALUE': {
				return <TopValues />
			}
			case 'BID': {
				return <TopBids />
			}
			case 'FAN': {
				return <TopPopularity />
			}
			default: {
				return null
			}
		}
	}

	return (
		<div>
			<h2>Welcome to Oshigame</h2>
			<Banner />
			<h3>phrase: {props.phrase} </h3>
			{/*phraseChanger()*/}
			<Grid stackable columns={16}>
				<Grid.Column mobile={16} tablet={8} computer={8}>
					{notices()}
				</Grid.Column>
				<Grid.Column mobile={16} tablet={8} computer={8}>
					<Grid.Row>
						<Form.Field
							control={Select}
							label='List to Show: '
							options={listOptions}
							placeholder='Lists'
							onChange={(e, data) => setShownList(data.value)}
							value={shownList}
						/>
					</Grid.Row>
					{list()}
				</Grid.Column>
			</Grid>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		serverTime: state.serverTime,
		phrase: state.phrase,
		notices: state.notices,
		user: state.user,
		token: state.token
	}
}

const mapDispatchToProps = {
	setNotification,
	//changePhrase,
	addNotice,
	removeNotice,
	updateNotice
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)