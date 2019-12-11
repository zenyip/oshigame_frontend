import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

const TopPopularity = (props) => {
	const [hoverMember, setHoverMember] = useState(null)

	const { members } = props

	const sortFunctionByFanSize = (a, b) => {
		const fanA = a.fanSize
		const fanB = b.fanSize
		return fanB - fanA

	}

	const showPic = (member) => {
		setHoverMember(member)
	}

	const hidePic = () => {
		setHoverMember(null)
	}

	const membersList = () => {
		if (members.length > 0) {
			let topMembers = members.slice(0)
			topMembers = topMembers.sort(sortFunctionByFanSize).slice(0, 10)
			return topMembers.map(m => (
				<div key={m.id}>
					<div>
						{`${topMembers.indexOf(m) + 1}. `}
						<Link to={`/members/${m.id}`} onMouseOver={()=>showPic(m)} onMouseOut={hidePic}>
							{m.nickname}
						</Link>
						{` with ${m.fanSize} fans`}
					</div>
				</div>
			))
		} else {
			return <div>Loading...</div>
		}
	}

	const memberPic = () => {
		if (hoverMember) {
			return <img src={hoverMember.pic_link} alt={`${hoverMember.name_e.firstname} ${hoverMember.name_e.lastname}`} height="200" />
		}
	}

	return (
		<div>
			<h3>Most Popular Members</h3>
			<Grid column={2}>
				<Grid.Column width={6}>
					{ membersList() }
				</Grid.Column>
				<Grid.Column>
					{ memberPic() }
				</Grid.Column>
			</Grid>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		members: state.members
	}
}

export default connect(mapStateToProps)(TopPopularity)