import React, { useState } from 'react'
import { changeCertBackground } from '../reducers/certBackgroundReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'

const CertBackgroundForm = (props) => {
	const { certBackground } = props
	const [newImgLink, setNewImgLink] = useState(certBackground)

	const handleChangeCertBackground = async (event) => {
		event.preventDefault()
		try {
			const changedBackground = await props.changeCertBackground(newImgLink, props.token)
			props.setNotification({ content: `cert background is changed to "${changedBackground.imgLink}"`, colour: 'green' })
		} catch (exception) {
			props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
		}
	}

	return (
		<Form onSubmit={handleChangeCertBackground}>
			<Form.Input
				label='new cert background'
				placeholder='http://newCertBackgroun.jpg'
				onChange={({ target }) => setNewImgLink(target.value)}
				value={newImgLink}
			/>
			<Button type="submit" color='pink'>Change Background</Button>
		</Form>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
		certBackground: state.certBackground
	}
}

const mapDispatchToProps = {
	setNotification,
	changeCertBackground
}

export default connect(mapStateToProps, mapDispatchToProps)(CertBackgroundForm)