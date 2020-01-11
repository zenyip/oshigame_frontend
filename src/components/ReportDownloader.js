import React from 'react'
import PDFCert from './PDFCert'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { connect } from 'react-redux'

const linkStyle = {
	textDecoration: 'none',
	color: 'grey'
}

const ReportDownloader = (props) => (
	<PDFDownloadLink style={linkStyle} document={<PDFCert user={props.user} certBackground={props.certBackground} />} fileName="oshigameTestdoc.pdf">
		{({ blob, url, loading, error }) => (loading ? 'Loading...' : props.displayText)}
	</PDFDownloadLink>
)

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(ReportDownloader)