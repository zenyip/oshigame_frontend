import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setToken } from '../reducers/tokenReducer'
import { setUser } from '../reducers/userReducer'
import { Link, withRouter } from 'react-router-dom'
import { Responsive, Icon } from 'semantic-ui-react'

const LogoutNoHistory = (props) => {
	const handleLogout = () => {
		window.localStorage.removeItem('oshigameUserToken')
		props.setToken(null)
		props.setUser(null)
		props.setNotification({ content: 'logged out successfully', colour: 'green' }, 'short')
		props.history.push('/')
	}

	return (
		<React.Fragment>
			<Responsive {...Responsive.onlyMobile}>
				<Link onClick={handleLogout} to="/"><Icon name='sign out' /></Link>
			</Responsive>
			<Responsive minWidth={Responsive.onlyTablet.minWidth}>
				<Icon name='sign out' onClick={handleLogout} />
				<Link onClick={handleLogout} to='/'>Logout</Link>
			</Responsive>
		</React.Fragment>
	)
}

const mapDispatchToProps = {
	setNotification,
	setUser,
	setToken
}

const Logout = withRouter(LogoutNoHistory)

export default connect(null, mapDispatchToProps)(Logout)