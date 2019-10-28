import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setToken } from '../reducers/tokenReducer'
import { setUser } from '../reducers/userReducer'
import { withRouter } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const LogoutNoHistory = (props) => {
	const handleLogout = () => {
		window.localStorage.removeItem('oshigameUserToken')
		props.setToken(null)
		props.setUser(null)
		props.setNotification({ content: 'logged out successfully', colour: 'green' }, 5)
		props.history.push('/')
	}

	return <Button onClick={handleLogout}>logout</Button>
}

const mapDispatchToProps = {
	setNotification,
	setUser,
	setToken
}

const Logout = withRouter(LogoutNoHistory)

export default connect(null, mapDispatchToProps)(Logout)