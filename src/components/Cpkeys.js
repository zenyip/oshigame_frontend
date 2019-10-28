import React, { useEffect }  from 'react'
import CpkeyForm from './CpkeyForm'
import { allKeys } from '../reducers/cpkeysReducer'
import { connect } from 'react-redux'

const Cpkeys = (props) => {

	useEffect (() => {
		if (props.token && props.user) {
			if (props.user.admin) {
				props.allKeys(props.token)
			}
		}
	}, [props.token, props.user])

	const cpkeysList = () => {
		if (props.cpkeys.length > 0) {
			return props.cpkeys.map(k => <div key={k.id}>{k.key}</div>)
		} else {
			return <div>no available keys</div>
		}
	}

	return (
		<div>
			<h2>Cpkeys</h2>
			<CpkeyForm />
			{ cpkeysList() }
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
		user: state.user,
		cpkeys: state.cpkeys
	}
}

const mapDispatchToProps = {
	allKeys
}

export default connect(mapStateToProps, mapDispatchToProps)(Cpkeys)