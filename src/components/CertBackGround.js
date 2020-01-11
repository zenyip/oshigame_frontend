import React from 'react'
import CertBackgroundForm from './CertBackGroundForm'
import { Image } from 'semantic-ui-react'
import { connect } from 'react-redux'

const CertBackGround = (props) => {
	const { certBackground } = props

	return certBackground ? (
		<div>
			<h2>Cert Background</h2>
			<Image src={certBackground} width={500} height='auto' alt='cert background'/>
			<CertBackgroundForm />
		</div>
	) :
	<CertBackgroundForm />
}

const mapStateToProps = (state) => {
	return {
		certBackground: state.certBackground
	}
}

export default connect(mapStateToProps)(CertBackGround)