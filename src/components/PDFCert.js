import React from 'react'
import { Page, Image, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer'

const PDFCert = (props) => {
	const { user } = props
	const backgroundPic = props.certBackground

	Font.registerHyphenationCallback(word => [word])

	const styles = StyleSheet.create({
		page: {
			backgroundColor: '#FFFFFF',
			backgroundImage: `url(${backgroundPic})`
		},
		section: {
			margin: 0,
			padding: 0
		},
		pageBackground: {
			position: 'absolute',
			minWidth: '100%',
			minHeight: '100%',
			display: 'block',
			height: '100%',
			width: '100%',
			opacity: 0.3
		},
		heading: {
			marginTop: 5,
			marginBottom: 5,
			marginHorizontal: 10,
			paddingHorizontal: 10,
			paddingVertical: 5,
			textAlign: 'center'
		},
		smallText: {
			paddingVertical: 5,
			paddingHorizontal: 20,
			fontSize: 12,
			hyphens: 'none'
		},
		title: {
			fontSize: 20
		},
		subtitle: {
			fontSize: 12
		},
		dateStamp: {
			fontSize: 8,
			paddingTop: 5
		},
		horizontalView: {
			flexDirection: 'row'
		},
		bestMemberFrame: {
			paddingTop: 0,
			paddingBottom: 10,
			paddingHorizontal: 20,
			flex: 1,
			textAlign: 'center'
		},
		bestMemberTitle: {
			fontSize: 16
		},
		bestMemberPic: {
			marginHorizontal: 'auto',
			height: 140,
			width: 105,
			objectFit: 'cover',
			border: 'solid',
			borderWidth: 2,
			borderColor: 'white'
		},
		bestMemberText: {
			fontSize: 12
		},
		sectionHeadText: {
			paddingVertical: 5,
			paddingHorizontal: 20,
			fontSize: 16
		},
		generalStatTitle: {
			paddingVertical: 5,
			paddingHorizontal: 20,
			flex: 3,
			fontSize: 12
		},
		generalStatData: {
			paddingVertical: 5,
			paddingHorizontal: 20,
			flex: 2,
			fontSize: 12
		},
		breakLine: {
			marginVertical: 5,
			marginHorizontal: 10,
			padding: 0,
			border: 'solid',
			borderTopWidth: 1
		},
		horizontalViewPadded: {
			flexDirection: 'row',
			paddingHorizontal: 20
		},
		memberlistName: {
			paddingVertical: 5,
			fontSize: 12,
			flex: 2.5
		},
		memberlistData: {
			paddingVertical: 5,
			fontSize: 12,
			flex: 1
		}
	})

	const oshimenList = (members) => {
		if (members.length > 0) {
			return members.map(m => (
				<View key={m.id} style={styles.horizontalViewPadded}>
					<Text style={styles.memberlistName}>{`${m.name_e.firstname} ${m.name_e.lastname} (${m.nickname})`}</Text>
					<Text style={styles.memberlistData}>{`Fans: ${m.fanSize}`}</Text>
					<Text style={styles.memberlistData}>{`Value: ${m.value}`}</Text>
				</View>
			))
		} else {
			return (<Text style={styles.smallText}>none</Text>)
		}
	}

	const printDate = () => new Date(Date.now())

	const header = () => (
		<View style={styles.heading}>
			<Text style={styles.title}>{user.displayname}</Text>
			<Text style={styles.subtitle}>by {user.username}</Text>
			<Text style={styles.dateStamp}>Report prined at {printDate().toString()}</Text>
		</View>
	)

	const dummyMember = {
		name_e: {
			firstname: 'N',
			lastname: 'A'
		},
		nickname: 'NA',
		pic_link: 'https://pbs.twimg.com/media/EN-4YBDU8AA_U85?format=jpg&name=medium',
		value: '---',
		fanSize: '---'
	}

	const MPM = () => {
		if (!user.oshimens.length > 0) {
			return dummyMember
		}
		const maxFans = Math.max(...user.oshimens.map(m => m.fanSize))
		return user.oshimens.find(m => m.fanSize === maxFans)
	}

	const MVM = () => {
		if (!user.oshimens.length > 0) {
			return dummyMember
		}
		const maxValue = Math.max(...user.oshimens.map(m => m.value))
		return user.oshimens.find(m => m.value === maxValue)
	}

	const MEM = () => {
		if (!user.oshimens.length > 0) {
			return dummyMember
		}
		const maxFTV = Math.max(...user.oshimens.map(m => m.fanSize / m.value))
		return user.oshimens.find(m => m.fanSize / m.value === maxFTV)
	}

	const mPicP = MPM().pic_forCert ? MPM().pic_forCert : dummyMember.pic_link
	const mPicV = MVM().pic_forCert ? MVM().pic_forCert : dummyMember.pic_link
	const mPicE = MEM().pic_forCert ? MEM().pic_forCert : dummyMember.pic_link

	const stat = (title, data) => (
		<View style={styles.horizontalView}>
			<Text style={styles.generalStatTitle}>{title}</Text>
			<Text style={styles.generalStatData}>{data}</Text>
		</View>
	)
	
	const sum = (array) => array.reduce((a, b) => a + b, 0)
	const average = (array) => sum(array) / array.length
	const dp = (n, d) => Math.floor(n * Math.pow(10, d)) / Math.pow(10, d)

	const totalValue = () => {
		if (user.oshimens.length > 0) {
			return sum(user.oshimens.map(m => m.value))
		} else {
			return 0
		}
	}

	const avgValue = () => {
		if (user.oshimens.length > 0) {
			const values = user.oshimens.map(m => m.value)
			return dp(average(values), 1)
		} else {
			return 0
		}
	}

	const totalFans = () => {
		if (user.oshimens.length > 0) {
			return sum(user.oshimens.map(m => m.fanSize))
		} else {
			return 0
		}
	}

	const avgFanSize = () => {
		if (user.oshimens.length > 0) {
			const fanSizes = user.oshimens.map(m => m.fanSize)
			return dp(average(fanSizes), 1)
		} else {
			return 0
		}
	}

	const avgFTV = () => {
		if (user.oshimens.length > 0) {
			const FTVs = user.oshimens.map(m => m.fanSize / m.value)
			return dp(average(FTVs), 2)
		} else {
			return 0
		}
	}

	const overallFTV = () => {
		if (user.oshimens.length > 0) {
			return dp(totalFans() / totalValue(), 2)
		} else {
			return 0
		}
	}

	const pageTemplate = () => (
		<React.Fragment>
			<Image src={backgroundPic} style={styles.pageBackground} />
			{header()}
			<View style={styles.breakLine} />
		</React.Fragment>
	)

	const oshimenPages = () => {
		if (user.oshimens.length > 0) {
			if (user.oshimens.length < 9) {
				return (
					<Page size="A6" orientation='landscape' style={styles.page}>
						{pageTemplate()}
						<Text style={styles.sectionHeadText}>List of Members:</Text>
						{oshimenList(user.oshimens)}
					</Page>
				)
			} else {
				const firstHalf = user.oshimens.slice(0, 8)
				const secondHalf = user.oshimens.slice(8)
				return (
					<React.Fragment>
						<Page size="A6" orientation='landscape' style={styles.page}>
							{pageTemplate()}
							<Text style={styles.sectionHeadText}>List of Members: (Page 1 of 2)</Text>
							{oshimenList(firstHalf)}
						</Page>
						<Page size="A6" orientation='landscape' style={styles.page}>
							{pageTemplate()}
							<Text style={styles.sectionHeadText}>List of Members: (Page 2 of 2)</Text>
							{oshimenList(secondHalf)}
						</Page>
					</React.Fragment>
				)
			}
		}
	}

	return (
		<Document title={`Oshigame Agency Report for ${user.disaplayname}`} author='Oshigame'>
			<Page size="A6" orientation='landscape' style={styles.page}>
				{pageTemplate()}
				<View style={styles.horizontalView}>
					<View style={styles.bestMemberFrame}>
						<Text style={styles.bestMemberTitle}>Most Popular</Text>
						<Image src={mPicP} style={styles.bestMemberPic} />
						<Text style={styles.bestMemberText}>{`${MPM().name_e.firstname} ${MPM().name_e.lastname}`}</Text>
						<Text style={styles.bestMemberText}>{`Fans: ${MPM().fanSize}`}</Text>
					</View>
					<View style={styles.bestMemberFrame}>
						<Text style={styles.bestMemberTitle}>Most Valuable</Text>
						<Image src={mPicV} style={styles.bestMemberPic} />
						<Text style={styles.bestMemberText}>{`${MVM().name_e.firstname} ${MVM().name_e.lastname}`}</Text>
						<Text style={styles.bestMemberText}>{`Value: ${MVM().value}`}</Text>
					</View>
					<View style={styles.bestMemberFrame}>
						<Text style={styles.bestMemberTitle}>Most Effective</Text>
						<Image src={mPicE} style={styles.bestMemberPic} />
						<Text style={styles.bestMemberText}>{`${MEM().name_e.firstname} ${MEM().name_e.lastname}`}</Text>
						<Text style={styles.bestMemberText}>{`FtV Index: ${dp(MEM().fanSize / MEM().value, 2)}`}</Text>
					</View>
				</View>
			</Page>
			<Page size="A6" orientation='landscape' style={styles.page}>
				{pageTemplate()}
				<Text style={styles.sectionHeadText}>Summary:</Text>
				{stat('Cash:', `$ ${user.assest}`)}
				{stat('Number of Members:', user.oshimens.length)}
				{stat('Total Fan Size:', totalFans())}
				{stat('Member Total Value:', `$ ${totalValue()}`)}
				{stat('Member Average Fan Size:', avgFanSize())}
				{stat('Member Average Value:', `$ ${avgValue()}`)}
				{stat('Overall Fans-to-Value Index:', overallFTV())}
				{stat('Average Fans-to-Value Index:', avgFTV())}
			</Page>
			{oshimenPages()}
		</Document>
	)
}

export default PDFCert