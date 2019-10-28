import React from 'react'
import { connect } from 'react-redux'
import { setUsername, setPassword } from '../reducers/loginInfoReducer'
import { setNotification } from '../reducers/notificationReducer'
import { setToken } from '../reducers/tokenReducer'
import { userLogin } from '../reducers/userReducer'
import { setUserByToken } from '../reducers/userReducer'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const LoginNoHistory = (props) => {
	const handleUsernameChange = (event) => {
		props.setUsername(event.target.value)
	}

	const handlePasswordChange = (event) => {
		props.setPassword(event.target.value)
	}

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			const loggedUser = await props.userLogin(props.loginInfo)
			props.setUsername('')
			props.setPassword('')
			window.localStorage.setItem(
				'oshigameUserToken', JSON.stringify(loggedUser.token)
			)
			props.setToken(loggedUser.token)
			const user = await props.setUserByToken(loggedUser.token)
			props.history.push('/')
			props.setNotification({ content: `successfully logged in as ${user.displayname}`, colour: 'green' }, 5)
		} catch (exception) {
			props.setNotification({ content: 'wrong user name or password', colour: 'red' }, 5)
		}
	}

	return (
		<Form onSubmit={handleLogin} padding="5" >
			<Form.Field>
				<label>username</label>
				<input id="username" onChange={handleUsernameChange} value={props.loginInfo.username} />
			</Form.Field>
			<Form.Field>
				<label>password</label>
				<input id="password" type='password' onChange={handlePasswordChange} value={props.loginInfo.password} />
			</Form.Field>
			<Button id="loginButton" type="submit">login</Button>
			<Link to="/sign_up"><Button color='pink' >Sign Up</Button></Link>
		</Form>
	)
}

const mapStateToProps = (state) => {
	return {
		loginInfo: state.loginInfo,
		user: state.user
	}
}

const mapDispatchToProps = {
	setNotification,
	setUsername,
	setPassword,
	setToken,
	setUserByToken,
	userLogin
}

const LoginForm = withRouter(LoginNoHistory)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)