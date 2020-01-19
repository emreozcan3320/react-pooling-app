import React from 'react';
import Question from '../components/Question';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const QuestionList = ({location, history}) => {
	let questionList = ""
	try {
		questionList = location.state.questionList
	} catch(error) {
		history.push("/")
	}

	return (
		<div className="question_list">
			<Container>
				<Button
					className="add_new_question_button"
					variant="success"
					size="lg"
					block
					onClick={() => {
						history.push("/createQuestion")
					}}>
					Create new Question
				</Button>
			</Container>
			<Question
				questions={questionList}
				history={history}
			/>
		</div>
	);
}

export default QuestionList;
