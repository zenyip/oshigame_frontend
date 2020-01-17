import React from 'react'
import { connect } from 'react-redux'
import { Menu as UIMenu, Grid } from 'semantic-ui-react'

const style = {
	marginBottom: "20px",
	marginTop: "0px"
}

const CurrentUser = (props) => {
	if (props.user) {
		return (
			<UIMenu style={style} fluid widths={1}>
				<UIMenu.Item>
					<Grid>
						<Grid.Column verticalAlign='middle'>
							<div>{props.user.displayname}</div>
							<div>Money: ${props.user.assest}</div>
						</Grid.Column>
					</Grid>
				</UIMenu.Item>
			</UIMenu>
		)
	} else {
		return (
			null
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(CurrentUser)