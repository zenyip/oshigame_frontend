import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

const TopValues = (props) => {
	const [hoverMember, setHoverMember] = useState(null)

	const { members } = props

	const sortFunctionByValue = (a, b) => {
		const valueA = a.value
		const valueB = b.value
		return valueB - valueA

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
			topMembers = topMembers.sort(sortFunctionByValue).slice(0, 10)
			return topMembers.map(m => (
				<div key={m.id}>
					{`${topMembers.indexOf(m) + 1}. `}
					<Link to={`/members/${m.id}`} onMouseOver={()=>showPic(m)} onMouseOut={hidePic}>
						{m.nickname}
					</Link>
					{` at ${m.value}`}
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
			<h3>Most Expensive Members</h3>
			<Grid>
				<Grid.Column mobile={16} tablet={16} computer={8}>
					{ membersList() }
				</Grid.Column>
				<Grid.Column only='computer'>
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

export default connect(mapStateToProps)(TopValues)