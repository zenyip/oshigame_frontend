import React from 'react'
import { Button } from 'semantic-ui-react'

const ButtonProcessing = (props) => {
	const style = props.style ? props.style : {}

	return (
		<Button disabled style={style}>
			Processing
		</Button>
	)
}

export default ButtonProcessing