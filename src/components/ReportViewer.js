import React from 'react'
import { PDFViewer } from '@react-pdf/renderer'
import PDFCert from './PDFCert'
import { connect } from 'react-redux'

const ReportViewer = (props) => (
	<PDFViewer width='100%' height={500}>
		<PDFCert user={props.user} certBackground={props.certBackground} />
	</PDFViewer>
)

const mapStateToProps = (state) => {
	return {
		user: state.user,
		certBackground: state.certBackground
	}
}

export default connect(mapStateToProps)(ReportViewer)