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
import Users from './components/Users'
import Negotiations from './components/Negotiations'
import MemberForm from './components/MemberForm'
import Controls from './components/Controls'
import MenuBottom from './components/MenuBottom'
import HowToPlay from './components/HowToPlay'
import About from './components/About'
import { getServerTime, oneTick } from './reducers/timeReducer'
import { initializeMembers } from './reducers/membersReducer'
import { initializeDisplaynames } from './reducers/displaynamesReducer'
import { initializeNotices } from './reducers/noticesReducer'
import { setToken } from './reducers/tokenReducer'
import { setUserByToken } from './reducers/userReducer'
import { checkPhrase } from './reducers/phraseReducer'
import { getCertBackground } from './reducers/certBackgroundReducer'
import {
	BrowserRouter as Router,
	Route, Redirect
} from 'react-router-dom'
import { Container, Segment } from 'semantic-ui-react'
import './css/oshigame.css'

const App = (props) => {

	const { getServerTime, oneTick, setToken, setUserByToken, initializeMembers, initializeDisplaynames, initializeNotices, checkPhrase, getCertBackground } = props

	useEffect (() => {
		const startsTicking = () => {
			setInterval(oneTick, 1000)
		}
		getServerTime()
		startsTicking()
		initializeMembers()
		initializeDisplaynames()
		initializeNotices()
	}, [getServerTime, oneTick, initializeMembers, initializeDisplaynames, initializeNotices])

	useEffect (() => {
		checkPhrase()
		getCertBackground()
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
				<Segment basic>
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
					<Route exact path="/users" render={() =>
						<Users />
					} />
					<Route exact path="/negotiations" render={() =>
						<Negotiations />
					} />
					<Route exact path="/new_member" render={() =>
						<MemberForm />
					} />
					<Route exact path="/controls" render={() =>
						<Controls />
					} />
					<Route exact path="/howtoplay" render={() =>
						<HowToPlay />
					} />
					<Route exact path="/about" render={() =>
						<About />
					} />
					<Route path="/" render={() =>
						<MenuBottom />
					} />
				</Segment>
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
	getServerTime,
	oneTick,
	initializeMembers,
	initializeDisplaynames,
	initializeNotices,
	checkPhrase,
	getCertBackground
}

export default connect(mapStateToProps, mapDispatchToProps)(App)