import React, { useState } from 'react'
import resetService from '../services/reset'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu as UIMenu, Button, Confirm } from 'semantic-ui-react'

const AdminMenu = (props) => {
	const [confirmOpen, setConfirmOpen] = useState(false)

	const handleReset = () => {
		setConfirmOpen(true)
	}

	const handleConfirmCancel = () => {
		setConfirmOpen(false)
	}

	const handleConfirmConfirm = async () => {
		await resetService.resetDB(props.token)
		props.setNotification({ content: 'database reseted', colour: 'orange' }, 'long')
		setConfirmOpen(false)
	}

	const linkStyle = {
		textDecoration: 'none',
		color: 'white'
	}

	return (
		<React.Fragment>
			<UIMenu.Item link>
				<Link to="/game/users" style={linkStyle}>users</Link>
			</UIMenu.Item>
			<UIMenu.Item link>
				<Link to="/game/negotiations" style={linkStyle}>negotiations</Link>
			</UIMenu.Item>
			<UIMenu.Item link>
				<Link to="/game/new_member" style={linkStyle}>edit member</Link>
			</UIMenu.Item>
			<UIMenu.Item link>
				<Link to="/game/controls" style={linkStyle}>controls</Link>
			</UIMenu.Item>
			<UIMenu.Item>
				<Button onClick={handleReset}>RESET DB</Button>
				<Confirm
					open={confirmOpen}
					onCancel={handleConfirmCancel}
					onConfirm={handleConfirmConfirm}
				/>
			</UIMenu.Item>
		</React.Fragment>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
	}
}

const mapDispatchToProps = {
	setNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminMenu)