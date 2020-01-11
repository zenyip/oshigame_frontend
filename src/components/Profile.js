import React, { useState } from 'react'
import User from './User'
import Loading from './Loading'
import ReportViewer from './ReportViewer'
import ReportDownloader from './ReportDownloader'
import { connect } from 'react-redux'
import { Responsive, Button, Icon } from 'semantic-ui-react'

const Profile = (props) => {
	const { user, members } = props
	const [showReport, setShowReport] = useState(false)
	const reportStyle = showReport ? {display: null} : {display: 'none'}

	const toggleReport = () => {
		setShowReport(!showReport)
	}

	if (user && members.length > 0) {
		return (
			<div>
				<div>
					<h2 style={{display: 'inline'}}>Profile</h2>
					<Responsive {...Responsive.onlyComputer} style={{display: 'inline'}}>
						<Button style={{float: 'right'}} onClick={toggleReport}><Icon name='vcard' />Show/Hide Agency Report</Button>
					</Responsive>
					<Responsive {...Responsive.onlyTablet} style={{display: 'inline'}}>
						<Button style={{float: 'right'}}><Icon name='vcard' /><ReportDownloader displayText='Download Agency Report' /></Button>
					</Responsive>
					<Responsive {...Responsive.onlyMobile} style={{display: 'inline'}}>
						<Button style={{float: 'right'}}><Icon name='vcard' /><ReportDownloader displayText='Download' /></Button>
					</Responsive>
				</div>
				<div style={reportStyle}>
					<ReportViewer />
				</div>
				<User shownUser = {user} />
			</div>
		)
	} else {
		return <Loading />
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		members: state.members
	}
}

export default connect(mapStateToProps)(Profile)