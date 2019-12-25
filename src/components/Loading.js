import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const Loading = () => {
	return (
		<Dimmer active page>
			<Loader>Loading...</Loader>
		</Dimmer>
	)
}

export default Loading