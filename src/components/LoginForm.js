import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setToken } from '../reducers/tokenReducer'
import { userLogin } from '../reducers/userReducer'
import { setUserByToken } from '../reducers/userReducer'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const LoginNoHistory = (props) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const loginInfo = {
				username,
				password
			}

			const loggedUser = await props.userLogin(loginInfo)
			setUsername('')
			setPassword('')
			window.localStorage.setItem(
				'oshigameUserToken', JSON.stringify(loggedUser.token)
			)
			props.setToken(loggedUser.token)
			const user = await props.setUserByToken(loggedUser.token)
			props.history.push('/')
			props.setNotification({ content: `successfully logged in as ${user.displayname}`, colour: 'green' })
		} catch (exception) {
			props.setNotification({ content: 'wrong user name or password', colour: 'red' }, 'long')
		}
	}

	return (
		<Form onSubmit={handleLogin} padding="5" >
			<Form.Input 
				label='username'
				placeholder='username'
				onChange={({ target }) => setUsername(target.value)}
				value={username}
			/>
			<Form.Input
				label='password'
				placeholder='password'
				type='password'
				onChange={({ target }) => setPassword(target.value)}
				value={password}
			/>
			<Button type="submit">login</Button>
			<Link to="/game/sign_up"><Button color='pink' >Sign Up</Button></Link>
		</Form>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	setNotification,
	setToken,
	setUserByToken,
	userLogin
}

const LoginForm = withRouter(LoginNoHistory)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)