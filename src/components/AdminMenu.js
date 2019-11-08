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
		props.setNotification({ content: 'database reseted', colour: 'orange' }, 5)
		setConfirmOpen(false)
	}

	return (
		<React.Fragment>
			<UIMenu.Item link>
				<Link to="/cpkeys">cpkeys</Link>
			</UIMenu.Item>
			<UIMenu.Item link>
				<Link to="/users">users</Link>
			</UIMenu.Item>
			<UIMenu.Item link>
				<Link to="/negotiations">negotiations</Link>
			</UIMenu.Item>
			<UIMenu.Item link>
				<Link to="/new_member">add member</Link>
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