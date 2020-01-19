import React, {useState} from 'react';

import PersonalInformationForm from './PersonalInformationForm';
import ProfessionalInformationForm from './ProfessionalInformationForm';

const WelcomePage = ({history}) => {
	const [stepCount, setStepCount] = useState(1);

	const nextStep = () => {
		if(stepCount + 1 === 3) {
			history.push('/menu')
		} else {
			setStepCount(stepCount + 1)
		}
	}

	const prevStep = () => {
		setStepCount(setStepCount - 1)
	}


	switch(stepCount) {
		case 1:
			return <PersonalInformationForm
				nextStep={nextStep}
			/>
		case 2:
			return <ProfessionalInformationForm
				nextStep={nextStep}
				prevStep={prevStep}
			/>
		default:
			return <h1>Something Went Wrong in ** WelcomePage **</h1>
	}
}

export default WelcomePage;
