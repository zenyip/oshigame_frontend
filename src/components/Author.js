import React from 'react'
import profile from '../img/profile.png'
import '../css/author.css'

const Author = () => (
	<div>
		<div id='authorText'>
			<h2>Profile</h2>
			<img src={profile} alt='profile' height={200}/>
			<p>This page is still underdevelopment.</p>
			<p>Back to Oshi-Game: <a href='https://oshigame.herokuapp.com/'>https://oshigame.herokuapp.com/</a></p>
		</div>
		<div id='authorPageBG' />
	</div>
)


export default Author