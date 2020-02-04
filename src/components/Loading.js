import React from 'react'
import { Dimmer } from 'semantic-ui-react'
import '../css/animations.css'

const Loading = (props) => {
	return (
		<Dimmer active={props.active} page>
			<div id='loadingLogo' />
		</Dimmer>
	)
}

export default Loading