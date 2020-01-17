import React from 'react'
import { Link } from 'react-router-dom'
import { Menu as UIMenu, Icon, Responsive } from 'semantic-ui-react'

const linkStyle = {
	textDecoration: 'none',
	color: 'white'
}

const MenuBottom = () => {
	return (
		<React.Fragment>
			<div style={{padding: 20}}/>
			<UIMenu className='ui bottom fixed menu' widths={3} color='pink' inverted>
				<UIMenu.Item>
					<Responsive {...Responsive.onlyMobile}>
						<Link to="/" style={linkStyle}><Icon name='home' /></Link>
					</Responsive>
					<Responsive minWidth={Responsive.onlyTablet.minWidth}>
						<Icon name='home' />
						<Link to="/" style={linkStyle}>Home</Link>
					</Responsive>
				</UIMenu.Item>
				<UIMenu.Item>
					<Responsive {...Responsive.onlyMobile}>
						<Link to="/howtoplay" style={linkStyle}><Icon name='question circle outline' /></Link>
					</Responsive>
					<Responsive minWidth={Responsive.onlyTablet.minWidth}>
						<Icon name='question circle outline' />
						<Link to="/howtoplay" style={linkStyle}>How To Play</Link>
					</Responsive>
				</UIMenu.Item>
				<UIMenu.Item>
					<Responsive {...Responsive.onlyMobile}>
						<Link to="/about" style={linkStyle}><Icon name='info circle' /></Link>
					</Responsive>
					<Responsive minWidth={Responsive.onlyTablet.minWidth}>
						<Icon name='info circle' />
						<Link to="/about" style={linkStyle}>About</Link>
					</Responsive>
				</UIMenu.Item>
			</UIMenu>
		</React.Fragment>
	)
}

export default MenuBottom