import React from 'react';

const ProfessionalInformationForm = (props) => {
	return (
		<div>
			This is Professional Information From Page
			<br></br>
			<button
				onClick={props.prevStep}
			>Prev
			</button>

			<button
				onClick={props.nextStep}
			>Done
			</button>
		</div>
	);
}

export default ProfessionalInformationForm;
