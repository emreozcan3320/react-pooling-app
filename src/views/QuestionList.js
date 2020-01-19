import React from 'react';
import {Link} from "react-router-dom";

import Question from '../components/Question';

const QuestionList = ({location, history}) => {
	let questionList = ""
	try {
		questionList = location.state.questionList
	} catch (error) {
		history.push("/")
	}
	
	return (
		<div>
			<button
				onClick={() => {
					history.push("/createQuestion")
				}}
			>Create new Question
			</button>
			<Question
				questions={questionList}
				history={history}
			/>
			<Link to="/">MENU</Link>
		</div>
	);
}

export default QuestionList;
