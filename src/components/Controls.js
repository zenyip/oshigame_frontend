import React from 'react'
import Cpkeys from './Cpkeys'
import Notices from './Notices'
import CertBackGround from './CertBackGround'
import MissingInfo from './MissingInfo'

const breakLineStyle = {
	margin: 20,
	padding: 0,
	borderTop: 'solid',
	borderColor: 'pink',
	borderWidth: 1
}

const Controls = () => (
	<div>
		<Notices />
		<div style={breakLineStyle} />
		<Cpkeys />
		<div style={breakLineStyle} />
		<CertBackGround />
		<div style={breakLineStyle} />
		<MissingInfo />
	</div>
)


export default Controls