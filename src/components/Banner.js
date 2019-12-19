import React from 'react'
import { connect } from 'react-redux'
import { Responsive } from 'semantic-ui-react'
import '../css/animations.css'

const Banner = (props) => {
	const { members } = props

	const jobList = ['SHOWROOM', 'HANDSHAKE', 'TV']
	const randomJob = jobList[Math.floor(Math.random() * (jobList.length))]

	const picStyle = {
		display: 'inline'
	}

	const membersPic = (job, mobile) => {
		if (members.length > 0) {
			const workingMembers = members.filter(m => {
				if (m.job) {
					if (m.job.name === job) {
						return true
					}
				}
				return false
			})
			if (workingMembers.length === 0) {
				return <div>No Member Currently Working for {job}</div>
			}
			let randomIndices = []
			let showingMembers = []
			if (workingMembers.length <=3) {
				showingMembers = workingMembers
			} else {
				for (let i = 0; i < 3; i++) {
					while (randomIndices.length === i) {
						const pendingIndex = Math.floor(Math.random() * (workingMembers.length))
						if (!randomIndices.includes(pendingIndex)) {
							randomIndices.push(pendingIndex)
						}
					}
				}
				showingMembers = [workingMembers[randomIndices[0]], workingMembers[randomIndices[1]], workingMembers[randomIndices[2]]]
			}
			let width='150'
			if (mobile) {
				width='100'
			}
			return showingMembers.map(m => (
				<img key={m.id} src={m.pic_link} alt={`${m.name_e.firstname} ${m.name_e.lastname}`} sylte={picStyle} width={width}/>
			))
		}
		return <div>Loading...</div>
	}

	return (
		<div>
			<h3>Members Currently Working for {randomJob}</h3>
			<Responsive minWidth={Responsive.onlyTablet.minWidth}>
				<div className='banner'>
					{ membersPic(randomJob, false) }
				</div>
			</Responsive>
			<Responsive {...Responsive.onlyMobile}>
				<div className='bannerMobile'>
					{ membersPic(randomJob, true) }
				</div>
			</Responsive>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		members: state.members
	}
}

export default connect(mapStateToProps)(Banner)