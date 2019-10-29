import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Members = props => {
	if (props.members.length > 0) {
        const memberSpan = members => members.map(m => {
            return (
				<span key={m.id}>
					<Link to={`/members/${m.id}`}>
						<img src={m.pic_link} alt={`${m.name_e.firstname} ${m.name_e.lastname}`} height="200" />
					</Link>
				</span>
			)
		})

		return (
			<div>
				{memberSpan(props.members)}
            </div>
		)
	} else {
		return (
			<div>
				Loading...
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		members: state.members,
		user: state.user
	}
}

export default connect(mapStateToProps)(Members)