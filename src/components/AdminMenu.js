import React from 'react'
import { Link } from 'react-router-dom'
import { Menu as UIMenu } from 'semantic-ui-react'

const AdminMenu = () => {

	return (
		<React.Fragment>
			<UIMenu.Item link>
				<Link to="/cpkeys">cpkeys</Link>
			</UIMenu.Item>
			<UIMenu.Item link>
				<Link to="/users">users</Link>
			</UIMenu.Item>
		</React.Fragment>
	)
}

export default AdminMenu