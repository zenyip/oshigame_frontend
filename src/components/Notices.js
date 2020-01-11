import React, { useState } from 'react'
import { addNotice, removeNotice, updateNotice } from '../reducers/noticesReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Form, Button, List } from 'semantic-ui-react'

const Notices = (props) => {
	const [newNotice, setNewNotice] = useState('')

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
				<h2>Current Notes</h2>
				{noticeList()}
				{noticeForm()}
			</div>
		)
	}

	return notices()
}

const mapStateToProps = (state) => {
	return {
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

export default connect(mapStateToProps, mapDispatchToProps)(Notices)