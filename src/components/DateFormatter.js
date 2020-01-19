import React from 'react';

const DateFormatter = ({inputIsoDate}) => {
	const dateConverter = (inputDate) => {
		let date = new Date(inputDate);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let dt = date.getDate();
		if(dt < 10) {
			dt = '0' + dt;
		}
		if(month < 10) {
			month = '0' + month;
		}
		return <div className="date_formatter">{year}-{month}-{dt}</div>
	}

	if(inputIsoDate.length == 0) {
		return <div>Loading...</div>
	} else {
		return (
			<div>
				{dateConverter(inputIsoDate)}
			</div>
		);
	}


}

export default DateFormatter;
