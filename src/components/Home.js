import React, { useState } from 'react'
import TopBids from './TopBids'
import TopValues from './TopValues'
import TopPopularity from './TopPopularity'
import Banner from './Banner'
import { connect } from 'react-redux'
import { Form, Select, Grid, List } from 'semantic-ui-react'

const Home = (props) => {
	const [shownList, setShownList] = useState('FAN')
	
	const listOptions = [
		{ key: 'list1', text: 'Most Expensive Members', value: 'VALUE' },
		{ key: 'list2', text: 'Most Popular Members', value: 'FAN' },
		{ key: 'list3', text: 'Current Top 10 Bids', value: 'BID' }
	]

	const notices = () => (
		<div>
			<h3>Current Notes</h3>
			<List ordered>
				{props.notices.map(n => <List.Item key={n.id}>{n.content}</List.Item>)}
			</List>
		</div>
	)

	const list = () => {
		switch(shownList) {
			case 'VALUE': {
				return <TopValues />
			}
			case 'BID': {
				return <TopBids />
			}
			case 'FAN': {
				return <TopPopularity />
			}
			default: {
				return null
			}
		}
	}

	return (
		<div>
			<h2>Welcome to Oshigame</h2>
			<Banner />
			<h3>phrase: {props.phrase} </h3>
			<Grid stackable columns={16}>
				<Grid.Column mobile={16} tablet={8} computer={8}>
					{notices()}
				</Grid.Column>
				<Grid.Column mobile={16} tablet={8} computer={8}>
					<Grid.Row>
						<Form.Field
							control={Select}
							label='List to Show: '
							options={listOptions}
							placeholder='Lists'
							onChange={(e, data) => setShownList(data.value)}
							value={shownList}
						/>
					</Grid.Row>
					{list()}
				</Grid.Column>
			</Grid>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		phrase: state.phrase,
		notices: state.notices,
	}
}

export default connect(mapStateToProps)(Home)