import React, { useEffect }  from 'react'
import { connect } from 'react-redux'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Member from './components/Member'
import Members from './components/Members'
import Login from './components/Login'
import SignUpForm from './components/SignUpForm'
import Cpkeys from './components/Cpkeys'
import Users from './components/Users'
import { initializeMembers } from './reducers/membersReducer'
import { setToken } from './reducers/tokenReducer'
import { setUserByToken } from './reducers/userReducer'
import {
	BrowserRouter as Router,
	Route, Redirect
} from 'react-router-dom'
import { Container } from 'semantic-ui-react'


const App = (props) => {

	const { initializeMembers } = props

	useEffect (() => {
		initializeMembers()
	}, [])

	useEffect (() => {
		const loggedUserTokenJSON = window.localStorage.getItem('oshigameUserToken')

		if (loggedUserTokenJSON) {
			const savedToken = JSON.parse(loggedUserTokenJSON)
			props.setToken(savedToken)
			props.setUserByToken(savedToken)
		}
	}, [])

	const memberById = (id) => {
    return props.members.find(m => m.id === id)
  }

	return (
		<Container>
			<Router>
				<div>
					<Route path="/" render={() =>
						<div>
							<Menu />
							<Notification />
						</div>
					} />
					<Route exact path="/" render={() =>
						<Redirect to="/members" />
					} />
					<Route exaxt path="/login" render={() =>
						props.user ? <Redirect to="/" /> : <Login />
					} />
					<Route exaxt path="/sign_up" render={() =>
						props.user ? <Redirect to="/" /> : <SignUpForm />
					} />
					<Route exact path="/members" render={() =>
						<Members />
					} />
					<Route exact path="/members/:id" render={({ match }) =>
						<Member shownMember={memberById(match.params.id)} />
					} />
					<Route exact path="/cpkeys" render={() =>
						<Cpkeys />
					} />
					<Route exact path="/users" render={() =>
						<Users />
					} />
				</div>
			</Router>
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		members: state.members,
	}
}

const mapDispatchToProps = {
	setToken,
	setUserByToken,
	initializeMembers,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)