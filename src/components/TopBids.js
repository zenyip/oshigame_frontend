import React, { useEffect, useState }  from 'react'
import { getBids } from '../reducers/bidsReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

const TopBids = (props) => {
	const [hoverBid, setHoverBid] = useState(null)

	const {bids, getBids } = props

	useEffect (() => {
		getBids()
	}, [getBids])

	const showPic = (bid) => {
		setHoverBid(bid)
	}

	const hidePic = () => {
		setHoverBid(null)
	}

	const bidsList = () => {
		if (bids.length > 0) {
			let topBids = bids
			if (topBids.length > 10) {
				topBids = topBids.slice(0, 10)
			}
			return topBids.map(b => (
				<div key={b.id}>
					<div>
						{`${topBids.indexOf(b) + 1}. `}
						<Link to={`/members/${b.memberId}`} onMouseOver={()=>showPic(b)} onMouseOut={hidePic}>
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

	const memberPic = () => {
		if (hoverBid) {
			return <img src={hoverBid.pic_link} alt={`${hoverBid.firstname_e} ${hoverBid.lastname_e}`} height="200" />
		}
	}

	return (
		<div>
			<h3>Current Top 10 Bids</h3>
			<Grid column={2}>
				<Grid.Column width={6}>
					{ bidsList() }
				</Grid.Column>
				<Grid.Column>
					{ memberPic() }
				</Grid.Column>
			</Grid>
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