import React from 'react'
import { Accordion } from 'semantic-ui-react'

const panels = [
	{
		key: 'aim',
		title: {
			content: 'What is the aim of the game?',
			icon: 'question',
		},
		content: {
			content: (
				<div>
					<p>
						Oshi-Game is a online multi-playing game allowing you to act as an agency owner:
						to sign idols and assign them to work.
						Idols can accumulate popularity (fans) during working.
						Grow your agency by accumulate more fans, gaining more money, signing more idols, etc but all up to you.
					</p>
					<p>
						You have to gain money as to sign and keep the idols that you like.
						Becoming the biggest agency with all your favourite idols may be one of the common targets.
						There's, however, no fixed goal for this game. ALL UP TO YOU!!
					</p>
				</div>
			),
		},
	},
	{
		key: 'starting',
		title: {
			content: 'How can I start playing?',
			icon: 'question',
		},
		content: {
			content: (
				<div>
					<p>
						Just go sign up your account and that's it! (Top Right)
					</p>
					<p>
						However, as we are still under beta testing, you have to have a <strong>"create-key"</strong> for signing up.
						To obtain a create-key, simply send a message to <a href='https://twitter.com/YZennie'>https://twitter.com/YZennie</a>.
						We will generate and send the create-key to you ASAP.
					</p>
				</div>
			),
		},
	},
	{
		key: 'phrase',
		title: {
			content: 'What is "Phrase"?',
			icon: 'question',
		},
		content: {
			content: (
				<div>
					<p>
						Phrases limited what you can/cannot do during that period.
						Some actions can only be performed during curtain phrase(s).
					</p>
					<p>
						Here is totally 3 different "Phrases" now: "general", "rest-day" and "negotiation".
					</p>
					<p>
						<strong>Phrases Schedule: </strong><br />
						Monday: general <br />
						Tuesday: general <br />
						Wednesday: general <br />
						Thursday: general <br />
						Friday: rest-day <br />
						Saturaday: negotiation <br />
						Sunday: general <br />
						(Schedule according to Japan time / GMT+9)
					</p>
				</div>
			),
		},
	},
	{
		key: 'sign',
		title: {
			content: 'How can I acquire idols?',
			icon: 'question',
		},
		content: {
			content: (
				<div>
					<p>
						In most of the cases, you can only acquire (sign) a new idol during the "negotiation" phrase. <br />
						(Refer to the question about <strong>negotiation</strong>.)
					</p>
					<p>
						However, good news to newcomers.
						If you have no more than <strong>THREE</strong> idols under your agency,
						you can acquire idols by the 'late sign' system. <br />
						(Refer to the question about <strong>late sign</strong>.)
					</p>
				</div>
			)
		},
	},
	{
		key: 'negotiation',
		title: {
			content: 'What can I do during "negotiation" phrase?',
			icon: 'question',
		},
		content: {
			content: (
				<div>
					<p>
						Releasing an idol can be done at anytime.
						However, acquiring new idols can only be done during the negotitaion phrase.
						(Except late signing)
					</p>
					<p>
						Negotiation buttons will be available on each members' info page during negotiation phrase.
					</p>
					<p>
						There are 3 types of negotiation available at the moment:
					</p>
					<p>
						<strong>Bidding</strong> <br />
						For those idols that are still "agency-free", bidding is the way to obtain them.
						Simply place your bid onto the idol that you like to sign.
						Player with the highest bid will get the member at the end of that negotiation phrase.
					</p>
					<p>
						<strong>Offering</strong> <br />
						If the member you want has already be signed by others,
						offering is the way for you to get her.
						Sending an offer within the feasible range stated and wait for the acceptance from the current owner.
						This may allow you to get the idol from a price that is lower than her existing value!
						However, the current owner can also reject your offer, a deal is not guaranteed.
						All offers that haven't been settle will be cancelled at the end of that negotiation phrase.
					</p>
					<p>
						<strong>Force Trading</strong> <br />
						Similar to offering, but if your offering price is higher than 1.3x the member's current value,
						This will be considered as a "force trade".
						In this case, the original owner cannot reject your "offer".
						And you will get the member directly.
					</p>
					<p>
						Note that, each idols can only be traded once during each negotiation phrase.
						Unlimited offers can be sent or received before a trade is settled.
						But no more trading can be done to that idol during the same negotiation phrase after a settled trade.
					</p>
				</div>
			)
		},
	},
	{
		key: 'assignment',
		title: {
			content: 'How can I gain more money?',
			icon: 'question',
		},
		content: {
			content: (
				<div>
					<p>
						During the "general" phrase, you can assign jobs to the idols under your agency.
						Rewards can then be collected when the job is done.
					</p>
					<p>
						Some assignments earn you money; some assignments earn the idol fans.
						More fans the idol have, more money she can earn from assignments.
					</p>
					<p>
						Some assignments do have costs. Base on the value/salary of the idol.
						High salary idol with little fans may make you a lost in assignments.
					</p>
				</div>
			)
		},
	},
	{
		key: 'payrise',
		title: {
			content: 'Why do I have to rise the pay of idols?',
			icon: 'question',
		},
		content: {
			content: (
				<div>
					<p>
						Valuing up an idol needs money. High salary idols also cost you more money in assignments.
						But, you will still want to value your idols up.
						The main reason for that is the "Force Trading" system.
						As you cannot reject a force trade sent from others,
						the only way you can protect your idol is to value up you idol.
						As a result, the cost of force getting your idol will be higher.
					</p>
				</div>
			)
		},
	},
	{
		key: 'other',
		title: {
			content: 'I have more question not listed here!',
			icon: 'question',
		},
		content: {
			content: (
				<div>
					<p>
						No worries. Just send a message to <a href='https://twitter.com/YZennie'>https://twitter.com/YZennie</a>.
						We will try our best to answer you.
					</p>
				</div>
			)
		},
	},
]

const HowToPlay = () => (
	<div>
		<h2>How to Play</h2>
		<Accordion
			defaultActiveIndex={[]}
			panels={panels}
			exclusive={false}
			fluid
			styled
		/>
	</div>
)


export default HowToPlay