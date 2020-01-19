import React from 'react';
import {Link} from "react-router-dom";
import DateFormatter from './DateFormatter'

const Question = ({questions, history}) => {
	let counter = 0;

	if(questions == null) {
		return <div>Looding..</div>
	} else {
		return (
			<div className="question_list">
				{
					questions.map(question => {
						counter += 1;
						return (
							<div key={counter} className="question_item">
								<h3>{counter} => {question.question}</h3>
								<DateFormatter
								inputIsoDate={question.published_at}
								/>
								<Link to={question.url}>Detail</Link>
							</div>
						)
					})
				}
			</div>
		);
	}
}

export default Question;
