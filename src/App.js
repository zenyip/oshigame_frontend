import React, { useEffect }  from 'react'
import { connect } from 'react-redux'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Home from './components/Home'
import Member from './components/Member'
import Members from './components/Members'
import Login from './components/Login'
import SignUpForm from './components/SignUpForm'
import Profile from './components/Profile'
import Cpkeys from './components/Cpkeys'
import Users from './components/Users'
import Negotiations from './components/Negotiations'
import MemberForm from './components/MemberForm'
import { initializeMembers } from './reducers/membersReducer'
import { initializeDisplaynames } from './reducers/displaynamesReducer'
import { setToken } from './reducers/tokenReducer'
import { setUserByToken } from './reducers/userReducer'
import { checkPhrase } from './reducers/phraseReducer'
import {
	BrowserRouter as Router,
	Route, Redirect
} from 'react-router-dom'
import { Container } from 'semantic-ui-react'


const App = (props) => {

	const { setToken, setUserByToken, initializeMembers, initializeDisplaynames, checkPhrase } = props

	useEffect (() => {
		initializeMembers()
		initializeDisplaynames()
	}, [initializeMembers, initializeDisplaynames])

	useEffect (() => {
		checkPhrase()
	})

	useEffect (() => {
		const loggedUserTokenJSON = window.localStorage.getItem('oshigameUserToken')

		if (loggedUserTokenJSON) {
			const savedToken = JSON.parse(loggedUserTokenJSON)
			setToken(savedToken)
			setUserByToken(savedToken)
		}
	}, [setToken, setUserByToken])

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
						<Home />
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
					<Route exact path="/profile" render={() =>
						<Profile />
					} />
					<Route exact path="/cpkeys" render={() =>
						<Cpkeys />
					} />
					<Route exact path="/users" render={() =>
						<Users />
					} />
					<Route exact path="/negotiations" render={() =>
						<Negotiations />
					} />
					<Route exact path="/new_member" render={() =>
						<MemberForm />
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
	initializeDisplaynames,
	checkPhrase
}

export default connect(mapStateToProps, mapDispatchToProps)(App)