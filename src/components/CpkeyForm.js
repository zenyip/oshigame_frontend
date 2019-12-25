import React, { useState } from 'react'
import { addNewKey } from '../reducers/cpkeysReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

const CpkeyForm = (props) => {
	const [newCpkey, setNewCpkey] = useState('')

	const handleAddKey = async (event) => {
		event.preventDefault()
		try {
			const addedKey = await props.addNewKey(newCpkey, props.token)
			setNewCpkey('')
			props.setNotification({ content: `key "${addedKey.key}" is added`, colour: 'green' })
		} catch (exception) {
			props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
		}
	}

	return (
		<Form onSubmit={handleAddKey}>
			<Form.Input
				label='new CP-Key'
				placeholder='new CP-Key'
				onChange={({ target }) => setNewCpkey(target.value)}
				value={newCpkey}
			/>
			<Button type="submit">ADD KEY</Button>
		</Form>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.token
	}
}

const mapDispatchToProps = {
	setNotification,
	addNewKey
}

export default connect(mapStateToProps, mapDispatchToProps)(CpkeyForm)