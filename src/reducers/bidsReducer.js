import negotiationsService from '../services/negotiations'

const bidsReducer = (state = [], action) => {
	const sortByBid = (a, b) => {
		const BidA = a.bid
		const BidB = b.bid
		return BidB - BidA
	}

	switch(action.type) {
		case 'ALL_BIDS': {
			const sortedBids = action.data.sort(sortByBid)
			return sortedBids
		}
		default:
			return state
	}
}

export const getBids = () => {
	return async dispatch => {
		const bids = await negotiationsService.getBids()
		dispatch({
			type: 'ALL_BIDS',
			data: bids
		})
	}
}

export default bidsReducer