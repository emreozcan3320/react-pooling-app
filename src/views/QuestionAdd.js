import React, {useState, Fragment} from 'react'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const QuestionAdd = ({history}) => {

	const [question, setQuestion] = useState("")
	const [choice1, setChoice1] = useState("")
	const [choice2, setChoice2] = useState("")
	const [choice3, setChoice3] = useState("")
	const [choice4, setChoice4] = useState("")
	const [isAllFieldFilled, setIsAllFieldFilled] = useState(false);
	const [validationError, setValidationError] = useState(false)
	const [postError, setPostError] = useState(false)
	const [isSending, setIsSending] = useState(false)

	const isAllFieldFilledChecker = () => {
		if(
			question.length > 0 &&
			choice1.length > 0 &&
			choice2.length > 0 &&
			choice3.length > 0 &&
			choice4.length > 0) {
			setIsAllFieldFilled(true)
			return true;
		}
	}

	const updateQuestion = (e) => {
		setQuestion(e.target.value)
	}
	const updateChoiceOne = (e) => {
		setChoice1(e.target.value)
	}
	const updateChoiceTwo = (e) => {
		setChoice2(e.target.value)
	}
	const updateChoiceThree = (e) => {
		setChoice3(e.target.value)
	}
	const updateChoiceFour = (e) => {
		setChoice4(e.target.value)
	}

	const addQuestion = (e) => {
		e.preventDefault();
		if(isAllFieldFilledChecker()) {
			setValidationError(false)
			setIsSending(true)
			fetch('https://polls.apiblueprint.org/questions?', {
				method: 'POST',
				body: JSON.stringify({
					question: question,
					choices: [choice1, choice2, choice3, choice4]
				}),
				headers: {
					"Content-type": "application/json;"
				}
			})
			.then(response => response.json())
			.then((result) => {
					setIsSending(false)
					history.push("/")
				},
				(error) => {
					setIsSending(false)
					setPostError(true)
				})
		} else {
			setIsSending(false)
			setValidationError(true)
		}

	}

	return (
		<Container className="form_container">
			<Alert className={postError ? '' : 'hidden'} variant="danger">
				When data send something went wrong please try again
			</Alert>
			<Alert className={validationError ? '' : 'hidden'} variant="danger">
				Please fill all fields
			</Alert>
			<Form onSubmit={addQuestion}>
				<Form.Group controlId="question">
					<Form.Label>Question</Form.Label>
					<Form.Control as="textarea" rows="3" name="question" value={question} onChange={updateQuestion}/>
				</Form.Group>

				<Form.Group controlId="choice1">
					<Form.Label>Choice 1</Form.Label>
					<Form.Control type="text" placeholder="choiice one" value={choice1} onChange={updateChoiceOne}/>
				</Form.Group>

				<Form.Group controlId="choice2">
					<Form.Label>choice 2</Form.Label>
					<Form.Control type="text" placeholder="choiice two" value={choice2} onChange={updateChoiceTwo}/>
				</Form.Group>

				<Form.Group controlId="choice3">
					<Form.Label>choice 3</Form.Label>
					<Form.Control type="text" placeholder="choiice three" value={choice3} onChange={updateChoiceThree}/>
				</Form.Group>

				<Form.Group controlId="choice4">
					<Form.Label>choice 4</Form.Label>
					<Form.Control type="text" placeholder="choiice four" value={choice4} onChange={updateChoiceFour}/>
				</Form.Group>
				<Button variant="primary" type="submit" disabled={isSending}>Submit</Button>
			</Form>
		</Container>
	);
}

export default QuestionAdd;
