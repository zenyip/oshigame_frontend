import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import userService from '../services/users'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

const SignUpNoHistory = (props) => {
	const [username, setUsername] = useState('')
	const [displayname, setDisplayname] = useState('')
	const [password_1, setPassword_1] = useState('')
	const [password_2, setPassword_2] = useState('')
	const [createkey, setCreatekey] = useState('')

	const submit = async (event) => {
		event.preventDefault()
		if (!username || !displayname || !password_1 || !password_2 || !createkey) {
			props.setNotification({ content: 'one or more entries missing', colour: 'red' }, 5)
			return 
		}
		if (password_1 !== password_2) {
			props.setNotification({ content: 'passwords have to be the same', colour: 'red' }, 5)
			return
		}
		try {
			const newUserInfo = {
				username,
				displayname,
				password: password_1,
				createkey
			}
			const createdUser = await userService.addUser(newUserInfo)
			setUsername('')
			setDisplayname('')
			setPassword_1('')
			setPassword_2('')
			setCreatekey('')
			props.history.push('/login')
			props.setNotification({ content: `account for ${createdUser.username} is created successfully`, colour: 'green' }, 5)
		} catch (exception) {
			props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
		}
	}

	return (
		<Form onSubmit={submit}>
			<Form.Input
				label='username'
				placeholder='e.g. Fans0048'
				onChange={({ target }) => setUsername(target.value)}
				value={username}
			/>
			<Form.Input
				label='name for display'
				placeholder='e.g. The Legenary Idol Agency'
				onChange={({ target }) => setDisplayname(target.value)}
				value={displayname}
			/>
			<Form.Input
				label='password'
				placeholder='password'
				type='password'
				onChange={({ target }) => setPassword_1(target.value)}
				value={password_1}
			/>
			<Form.Input
				placeholder='password (please type again)'
				type='password'
				onChange={({ target }) => setPassword_2(target.value)}
				value={password_2}
			/>
			<Form.Input
				label='create-key'
				placeholder='create-key (provided by admin)'
				onChange={({ target }) => setCreatekey(target.value)}
				value={createkey}
			/>
			<Button color='pink' type="submit">Submit</Button>
		</Form>
	)
}

const mapDispatchToProps = {
	setNotification,
}

const SignUpForm = withRouter(SignUpNoHistory)

export default connect(null, mapDispatchToProps)(SignUpForm)