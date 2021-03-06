import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import timeReducer from './reducers/timeReducer'
import membersReducer from './reducers/membersReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import tokenReducer from './reducers/tokenReducer'
import cpkeysReducer from './reducers/cpkeysReducer'
import usersReducer from './reducers/usersReducer'
import negotiationsReducer from './reducers/negotiationsReducer'
import phraseReducer from './reducers/phraseReducer'
import bidsReducer from './reducers/bidsReducer'
import displaynamesReducer from './reducers/displaynamesReducer'
import noticesReducer from './reducers/noticesReducer'
import shownNoticeReducer from './reducers/shownNoticeReducer'
import certBackgroundReducer from './reducers/certBackgroundReducer'

const reducer = combineReducers({
	members: membersReducer,
	notification: notificationReducer,
	user: userReducer,
	token: tokenReducer,
	cpkeys: cpkeysReducer,
	users: usersReducer,
	negotiations: negotiationsReducer,
	phrase: phraseReducer,
	bids: bidsReducer,
	displaynames: displaynamesReducer,
	notices: noticesReducer,
	serverTime: timeReducer,
	shownNotice: shownNoticeReducer,
	certBackground: certBackgroundReducer
})

const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
)

export default store