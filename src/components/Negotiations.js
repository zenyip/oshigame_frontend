import React, { useEffect }  from 'react'
import { allNegotiations, clearNegotiations } from '../reducers/negotiationsReducer'
import negotiationsService from '../services/negotiations'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

const Negotiations = (props) => {
	const {token, user, negotiations, allNegotiations, clearNegotiations } = props

	useEffect (() => {
		if (token && user) {
			if (user.admin) {
				allNegotiations(token)
			}
		}
	}, [token, user, allNegotiations])

	const headstyle = {
		paddingTop: "20px"
	}

	const negotiationsList = () => {
		if (negotiations.length > 0) {
			return negotiations.map(n => (
				<div key={n.id}>
					<h3 style={headstyle}>{n.member.name_j}</h3>
					<div>type of trade: {n.tradeType}</div>
					<div>bid: {n.bid}</div>
					<div>applicant: {n.applicant.username}</div>
				</div>
			))
		} else {
			return <div>No Current Negotiations</div>
		}
	}

	const handleSettle = async () => {
		try {
			await negotiationsService.settle(props.token)
			props.setNotification({ content: 'negotiations have been settled', colour: 'green' })
			clearNegotiations()
		} catch (exception) {
			props.setNotification({ content: exception.response.data.error, colour: 'red' }, 'long')
		}
	}

	return (
		<div>
			<h2>Negotiations</h2>
			<Button onClick={handleSettle}> Settle </Button>
			{ negotiationsList() }
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
		user: state.user,
		negotiations: state.negotiations
	}
}

const mapDispatchToProps = {
	allNegotiations,
	clearNegotiations,
	setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Negotiations)