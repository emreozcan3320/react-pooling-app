import React from 'react';

const PersonalInformationForm = (props) => {
	return (
		<form>
			This is Personal Information From Page
			<br></br>
			<button
				onClick={props.nextStep}
			>Next
			</button>

		</form>
	);
}

export default PersonalInformationForm;
