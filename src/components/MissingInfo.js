import React  from 'react'
import { connect } from 'react-redux'

const MissingInfo = (props) => {
	const membersList = () => {
		const filteredMembers = props.members.filter(m => !m.pic_forCert)
		if (filteredMembers.length > 0) {
			return filteredMembers.map(m => (<div key={m.id}>{m.name_j}</div>))
		} else {
			return (<div>No missing infos</div>)
		}
	}

	return (
		<div>
			<h2>Members without Picture for Cert</h2>
			{ membersList() }
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		members: state.members
	}
}

export default connect(mapStateToProps)(MissingInfo)