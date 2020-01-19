import React from 'react';
import {Link} from "react-router-dom";

import Question from '../components/Question';

const QuestionList = ({location, history}) => {
	const questionList = location.state.questionList

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
