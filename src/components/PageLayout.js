import React from 'react'


import WelcomePage from './WelcomePage';
import MainPage from './MainPage';

export default function PageLayout(props) {

	if(props.isWelcomeEnd) {
		return (
			<div>
				<WelcomePage
					setIsWelcomeEnd={props.setIsWelcomeEnd}
				/>
			</div>
		)
	} else {
		return (
			<div>
				<MainPage
					setIsSurveyEnd={props.setIsSurveyEnd}
				/>
			</div>
		)
	}


}
