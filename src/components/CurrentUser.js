import React from 'react'
import { connect } from 'react-redux'
import Logout from './Logout'
import { Grid } from 'semantic-ui-react'

const CurrentUser = (props) => {
	if (props.user) {
		return (
			<Grid columns={2}>
				<Grid.Column width={9} verticalAlign='middle'>
					<div>{props.user.displayname}</div>
					<div>assest: {props.user.assest}</div>
				</Grid.Column>
				<Grid.Column width={1}>
					<Logout />
				</Grid.Column>
			</Grid>
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