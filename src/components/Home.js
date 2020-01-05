import React, { useState } from 'react'
import TopBids from './TopBids'
import TopValues from './TopValues'
import TopPopularity from './TopPopularity'
import Banner from './Banner'
import { addNotice, removeNotice, updateNotice } from '../reducers/noticesReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Form, Button, Select, Grid, List } from 'semantic-ui-react'

const Home = (props) => {
	const [newNotice, setNewNotice] = useState('')
	const [shownList, setShownList] = useState('FAN')
	
	const listOptions = [
		{ key: 'list1', text: 'Most Expensive Members', value: 'VALUE' },
		{ key: 'list2', text: 'Most Popular Members', value: 'FAN' },
		{ key: 'list3', text: 'Current Top 10 Bids', value: 'BID' }
	]

	const notices = () => {
		const noticeList = () => {
			const handleEditNotice = async (id) => {
				try {
					await props.updateNotice(id, newNotice, props.token)
					setNewNotice('')
					props.setNotification({ content: `Notice Updated`, colour: 'green' }, 'short')
				} catch (exception) {
					props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
				}
			}
			const handleRemoveNotice = async (id) => {
				try {
					await props.removeNotice(id, props.token)
					props.setNotification({ content: `Notice Removed`, colour: 'green' }, 'short')
				} catch (exception) {
					props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
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
			return (
				<List ordered>
					{props.notices.map(n => <List.Item key={n.id}>{n.content}</List.Item>)}
				</List>
			)
		}
		const noticeForm = () => {
			const handleNewNotice = async (event) => {
				event.preventDefault()
				try {
					await props.addNotice(newNotice, props.token)
					setNewNotice('')
					props.setNotification({ content: `New Notice Posted`, colour: 'green' }, 'short')
				} catch (exception) {
					props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
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
	addNotice,
	removeNotice,
	updateNotice
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)