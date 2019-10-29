import React, { useEffect }  from 'react'
import CpkeyForm from './CpkeyForm'
import { allKeys } from '../reducers/cpkeysReducer'
import { connect } from 'react-redux'

const Cpkeys = (props) => {
	const { token, user, allKeys, cpkeys } = props

	useEffect (() => {
		if (token && user) {
			if (user.admin) {
				allKeys(token)
			}
		}
	}, [token, user, allKeys])

	const cpkeysList = () => {
		if (cpkeys.length > 0) {
			return cpkeys.map(k => <div key={k.id}>{k.key}</div>)
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