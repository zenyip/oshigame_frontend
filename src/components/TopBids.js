import React, { useEffect }  from 'react'
import { getBids } from '../reducers/bidsReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const TopBids = (props) => {
	const {bids, getBids } = props

	useEffect (() => {
		getBids()
	}, [getBids])

	const bidsList = () => {
		if (bids.length > 0) {
			let topBids = bids
			if (topBids.length > 10) {
				topBids = topBids.slice(0, 10)
			}
			return topBids.map(b => (
				<div key={b.id}>
					<div>
						{`${bids.indexOf(b) + 1}. `}
						<Link to={`/members/${b.memberId}`}>
							{b.nickname}
						</Link>
						{` at ${b.bid}`}
					</div>
				</div>
			))
		} else {
			return <div>No Current Bids</div>
		}
	}

	return (
		<div>
			<h3>Current Top 10 Bids</h3>
			{ bidsList() }
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		bids: state.bids
	}
}

const mapDispatchToProps = {
	getBids
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBids)