import React from 'react'
import CurrentUser from './CurrentUser'
import AdminMenu from './AdminMenu'
import Logout from './Logout'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu as UIMenu, Icon, Responsive } from 'semantic-ui-react'

const style = {
	marginBottom: "20px"
}

const Menu = (props) => {

	const extendedMenu = () => (props.user ?
		<UIMenu.Item>
			<Responsive {...Responsive.onlyMobile}>
				<Link to="/profile"><Icon name='vcard' /></Link>
			</Responsive>
			<Responsive minWidth={Responsive.onlyTablet.minWidth}>
				<Icon name='vcard' />
				<Link to="/profile">Profile</Link>
			</Responsive>
		</UIMenu.Item> :
		null
	)

	const adminMenu = () => {
		if (props.user) {
			if (props.user.admin) {
				return <AdminMenu />
			}
		}
	}

	const signInOut = () => (props.user ?
		<UIMenu.Item>
			<Logout />
		</UIMenu.Item> :
		<UIMenu.Item>
			<Responsive {...Responsive.onlyMobile}>
				<Link to="/login"><Icon name='sign in' /></Link>
			</Responsive>
			<Responsive minWidth={Responsive.onlyTablet.minWidth}>
				<Icon name='sign in' />
				<Link to="/login">login / sign up</Link>
			</Responsive>
		</UIMenu.Item>
	)

	const menuWidth = () => {
		if (!props.user) {
			return 3
		} else if (props.user.admin) {
			return 9
		} else {
			return 4
		}
	}

	return (
		<React.Fragment>
			<UIMenu style={style} widths={menuWidth()}>
				<UIMenu.Item>
					<Responsive {...Responsive.onlyMobile}>
						<Link to="/"><Icon name='home' /></Link>
					</Responsive>
					<Responsive minWidth={Responsive.onlyTablet.minWidth}>
						<Icon name='home' />
						<Link to="/">Home</Link>
					</Responsive>
				</UIMenu.Item>
				<UIMenu.Item>
					<Responsive {...Responsive.onlyMobile}>
						<Link to="/members"><Icon name='female' /></Link>
					</Responsive>
					<Responsive minWidth={Responsive.onlyTablet.minWidth}>
						<Icon name='female' />
						<Link to="/members">Members</Link>
					</Responsive>
				</UIMenu.Item>
				{extendedMenu()}
				{adminMenu()}
				{signInOut()}
			</UIMenu>
			<CurrentUser />
		</React.Fragment>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(Menu)