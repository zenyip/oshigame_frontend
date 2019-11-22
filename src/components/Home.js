import React, { useState } from 'react'
import TopBids from './TopBids'
import TopValues from './TopValues'
import { changePhrase } from '../reducers/phraseReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Form, Button, Select, Grid } from 'semantic-ui-react'

const phraseList = ['general', 'negotiation']
const phraseOptions = phraseList.map(p => {return { key: p, text: p, value: p }})

const Home = (props) => {
	const [newPhrase, setNewPhrase] = useState(null)

	const phraseChanger = () => {
		const handlePhraseChange = async (event) => {
			event.preventDefault()
			try {
				const phrase = {
					'phrase': newPhrase
				}
				const changedPhrase = await props.changePhrase(phrase, props.token)
				setNewPhrase(null)
				props.setNotification({ content: `phrase is changed to "${changedPhrase.phrase}"`, colour: 'green' }, 5)
			} catch (exception) {
				props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
			}
		}
		if (props.user) {
			if (props.user.admin) {
				return (
					<Form onSubmit={handlePhraseChange}>
						<Form.Field
							control={Select}
							label='Change Phrase to: '
							options={phraseOptions}
							placeholder='new phrase'
							onChange={(e, data) => setNewPhrase(data.value)}
							value={newPhrase}
						/>
						<Button type="submit">Change</Button>
					</Form>
				)
			} else {
				return null
			}
		} else {
			return null
		}
	}

	const notice = () => {
		const greenText = {
			color: 'lime'
		}
		return (
			<div>
				<h3>Current Notes</h3>
				<div>1. The app is NOT responsive. Please use the app on computers.</div>
				<div>2. Client side is NOT synchronized witht the server automaticially. Please manually <span style={greenText}>REFRESH</span> the page to obtain the latest data.</div>
			</div>
		)
	}

	const ranking = () => props.phrase === 'negotiation' ? <TopBids /> : <TopValues />

	return (
		<div>
			<h2>Welcome to Oshigame</h2>
			<h3>phrase: {props.phrase} </h3>
			{phraseChanger()}
			<Grid column={2}>
				<Grid.Column width={8}>
					{notice()}
				</Grid.Column>
				<Grid.Column width={8}>
					{ranking()}
				</Grid.Column>
			</Grid>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		phrase: state.phrase,
		user: state.user,
		token: state.token
	}
}

const mapDispatchToProps = {
	setNotification,
	changePhrase,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)