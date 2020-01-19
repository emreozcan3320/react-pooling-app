import React, {useState} from 'react';

const QuestionAdd = ({history}) => {

	const [question, setQuestion] = useState("")
	const [choice1, setChoice1] = useState("")
	const [choice2, setChoice2] = useState("")
	const [choice3, setChoice3] = useState("")
	const [choice4, setChoice4] = useState("")

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
		const data = {
			question: question,
			choices: [choice1, choice2, choice3, choice4]
		}
		console.log(data)

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
				history.push("/")
			},
			(error) => {
				console.log("-----Error----");
				console.log(error)
			})

	}

	return (
		<form onSubmit={addQuestion}>
			<label>Question
				<input type="text" id="question" name="question" value={question} onChange={updateQuestion}/>
			</label>

			<label>choice1
				<input type="text" id="choice1" name="choice1" value={choice1} onChange={updateChoiceOne}/>
			</label>

			<label>choice2
				<input type="text" id="choice2" name="choice2" value={choice2} onChange={updateChoiceTwo}/>
			</label>

			<label>choice3
				<input type="text" id="choice3" name="choice3" value={choice3} onChange={updateChoiceThree}/>
			</label>

			<label>choice4
				<input type="text" id="choice4" name="choice4" value={choice4} onChange={updateChoiceFour}/>
			</label>

			<button>Submit</button>
		</form>
	);
}

export default QuestionAdd;
