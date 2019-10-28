import React from 'react'
import { setNewCpkey } from '../reducers/newCpkeyReducer'
import { addNewKey } from '../reducers/cpkeysReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

const CpkeyForm = (props) => {
	const handleKeyChange = (event) => {
		props.setNewCpkey(event.target.value)
	}

	const handleAddKey = async (event) => {
		event.preventDefault()
		try {
			const addedKey = await props.addNewKey(props.newCpkey, props.token)
			props.setNewCpkey('')
			props.setNotification({ content: `key "${addedKey.key}" is added`, colour: 'red' }, 5)
		} catch (exception) {
			props.setNotification({ content: exception.response.data.error, colour: 'red' }, 5)
		}
	}

	return (
		<Form onSubmit={handleAddKey}>
			<Form.Field>
				<label>new CP-Key</label>
				<input onChange={handleKeyChange} value={props.newCpkey} />
			</Form.Field>
			<Button type="submit">ADD KEY</Button>
		</Form>
	)
}

const mapStateToProps = (state) => {
	return {
		newCpkey: state.newCpkey,
		token: state.token
	}
}

const mapDispatchToProps = {
	setNotification,
	setNewCpkey,
	addNewKey
}

export default connect(mapStateToProps, mapDispatchToProps)(CpkeyForm)