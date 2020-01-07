import React, { useState, useEffect } from 'react'
import TopBids from './TopBids'
import TopValues from './TopValues'
import TopPopularity from './TopPopularity'
import Banner from './Banner'
import { noMoreNoticeOn, noMoreNoticeOff, turnOnNotice, turnOffNotice } from '../reducers/shownNoticeReducer'
import { connect } from 'react-redux'
import { Form, Select, List, Modal, Button, Icon, Checkbox } from 'semantic-ui-react'

const Home = (props) => {
	const { shownNotice,  noMoreNoticeOn, noMoreNoticeOff, turnOnNotice, turnOffNotice } = props
	const [shownList, setShownList] = useState('FAN')
	
	const listOptions = [
		{ key: 'list1', text: 'Most Expensive Members', value: 'VALUE' },
		{ key: 'list2', text: 'Most Popular Members', value: 'FAN' },
		{ key: 'list3', text: 'Current Top 10 Bids', value: 'BID' }
	]

	useEffect (() => {
		if (!shownNotice.noMore) {
			turnOnNotice()
		}
	}, [shownNotice.noMore, turnOnNotice])

	const handleNewsButtonClicked = () => {
		turnOnNotice()
	}

	const handleNoticeClose = () => {
		turnOffNotice()
	}

	const notices = () => (
		<div>
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

	const toggleNoMoreNotice = () => {
		if (shownNotice.noMore) {
			noMoreNoticeOff()
		} else {
			noMoreNoticeOn()
		}
	}

	return (
		<div>
			<h2>Welcome to Oshigame <Button onClick={handleNewsButtonClicked}><Icon name='newspaper outline' /> What's New</Button></h2>
			<Banner />
			<h3>phrase: {props.phrase} </h3>
			<Form.Field
				control={Select}
				label='List to Show: '
				options={listOptions}
				placeholder='Lists'
				onChange={(e, data) => setShownList(data.value)}
				value={shownList}
			/>
			{list()}
			<Modal open={shownNotice.switchOn} closeOnDimmerClick={false} onClose={handleNoticeClose}>
				<Modal.Header>
					News
				</Modal.Header>
				<Modal.Content>
					{notices()}
				</Modal.Content>
				<Modal.Actions>
					<Checkbox
						label="Don't show again before next visit."
						checked={shownNotice.noMore}
						onChange={toggleNoMoreNotice}
					/>
					<Button onClick={handleNoticeClose}>
						Close
					</Button>
				</Modal.Actions>
			</Modal>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		phrase: state.phrase,
		notices: state.notices,
		shownNotice: state.shownNotice
	}
}

const mapDispatchToProps = {
	noMoreNoticeOn,
	noMoreNoticeOff,
	turnOnNotice,
	turnOffNotice
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)