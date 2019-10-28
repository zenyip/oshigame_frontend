import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Members = props => {
	if (props.members.length > 0) {
        const memberSpan = members => members.map(member =>
            <span key={member.id}>
                <Link to={`/members/${member.id}`}>
                    <img src={member.pic_link} alt={member.name_e} height="200" />
                </Link>
            </span>
		)

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