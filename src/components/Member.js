import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid, Table } from 'semantic-ui-react'

const Member = (props) => {
	const { shownMember } = props
	if (shownMember) {
		const bday = shownMember.birthday.substring(0, 10)
		return (
			<div>
				<h2>{shownMember.name_j}</h2>
				<div>{shownMember.name_k.firstname}　{shownMember.name_k.lastname}</div>
				<Grid columns={2}>
					<Grid.Row>
						<Grid.Column width={5}>
							<img src={shownMember.pic_link} alt="profile pic" />
						</Grid.Column>
						<Grid.Column>
							<Table>
								<Table.Body>
									<Table.Row>
										<Table.Cell>Name:</Table.Cell>
										<Table.Cell>{shownMember.name_e.firstname} {shownMember.name_e.lastname}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Nickname:</Table.Cell>
										<Table.Cell>{shownMember.nickname}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Date Of Birth:</Table.Cell>
										<Table.Cell>{bday}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Team:</Table.Cell>
										<Table.Cell>{shownMember.team.join(" and ")}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Generation:</Table.Cell>
										<Table.Cell>{shownMember.generation.name}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Hometown:</Table.Cell>
										<Table.Cell>{shownMember.hometown}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Member Status:</Table.Cell>
										<Table.Cell>{shownMember.current ? 'Current Member' : 'Graduate'} {shownMember.kks ? '(Kenkyosen)' : ''}</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Agency:</Table.Cell>
										<Table.Cell>{shownMember.agency ? shownMember.agency : 'Free' }</Table.Cell>
									</Table.Row>
									<Table.Row>
										<Table.Cell>Value:</Table.Cell>
										<Table.Cell>{shownMember.value}</Table.Cell>
									</Table.Row>
								</Table.Body>
							</Table>
						</Grid.Column>
					</Grid.Row>
				</Grid>
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