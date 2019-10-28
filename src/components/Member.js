import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const Member = (props) => {
	if (props.shownMember) {
		const bday = props.shownMember.birthday.substring(0, 10)
		return (
			<div>
				<h2>{props.shownMember.name_j}</h2>
				<img src={props.shownMember.pic_link} alt="profile pic" />
				<p>Name: {props.shownMember.name_e} </p>
				<p>Nickname: {props.shownMember.nickname} </p>
				<p>DOB: {bday} </p>
				<p>Team: {props.shownMember.team.join(" and ")} </p>
				<p>Hometown: {props.shownMember.hometown} </p>
				<Link to={'/members'}>
                    <Button>back</Button>
                </Link>
			</div>
		)
	} else {
		return (
			<div>
				Member Not found
			</div>
		)
	}
}

export default Member