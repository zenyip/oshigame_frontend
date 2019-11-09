import negotiationsService from '../services/negotiations'

const negotiationsReducer = (state = [], action) => {
	const sortByBid = (a, b) => {
		const BidA = a.bid
		const BidB = b.bid
		return BidB - BidA
	}

	switch(action.type) {
	case 'ALL_NEGOTIATIONS': {
		const sortedNegotiations = action.data.sort(sortByBid)
		return sortedNegotiations
	}
	case 'BID_PLACED': {
		return state.concat(action.data)
	}
	case 'CLEAR_NEGOTIATIONS': {
		return []
	}
	default:
		return state
	}
}

export const allNegotiations = (token) => {
	return async dispatch => {
		const negotiations = await negotiationsService.getAll(token)
		dispatch({
			type: 'ALL_NEGOTIATIONS',
			data: negotiations
		})
	}
}

export const bidding = (bid, token) => {
	return async dispatch => {
		const negotiation = await negotiationsService.placeBid(bid, token)
		dispatch({
			type: 'BID_PLACED',
			data: negotiation
		})
		return negotiation
	}
}

export const clearNegotiations = () => {
	return async dispatch => {
		dispatch({
			type: 'CLEAR_NEGOTIATIONS'
		})
	}
}

export default negotiationsReducer