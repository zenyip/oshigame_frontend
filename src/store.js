import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import membersReducer from './reducers/membersReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import tokenReducer from './reducers/tokenReducer'
import cpkeysReducer from './reducers/cpkeysReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
	members: membersReducer,
	notification: notificationReducer,
	user: userReducer,
	token: tokenReducer,
	cpkeys: cpkeysReducer,
	users: usersReducer
})

const store = createStore(
	reducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
)

export default store