import React from 'react'
import CurrentUser from './CurrentUser'
import AdminMenu from './AdminMenu'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu as UIMenu, Button } from 'semantic-ui-react'

const style = {
	marginBottom: "20px"
}

const Menu = (props) => {

	const adminMenu = () => {
		if (!props.user) {
			return null
		} else if (!props.user.admin) {
			return null
		} else {
			return <AdminMenu />
		}
	}

	return (
		<UIMenu style={style}>
			<UIMenu.Item link>
				<Link to="/">Home</Link>
			</UIMenu.Item>
			<UIMenu.Item link>
				<Link to="/members">Members</Link>
			</UIMenu.Item>
			<UIMenu.Item>
				{props.user ? <CurrentUser /> : <Link to="/login"><Button>login</Button></Link>}
			</UIMenu.Item>
			{adminMenu()}
		</UIMenu>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(Menu)