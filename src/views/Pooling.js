import React, {useState, useEffect, useContext} from 'react';
import Choice from "../components/Choice";
import {QuestionsContext} from '../providers/QuestionsContext';
import DateFormatter from '../components/DateFormatter';

const Pooling = ({history, match, location}) => {
	const [questionCount, setQuestionCount] = useContext(QuestionsContext);
	let baseUrl = ""
	try {
		 baseUrl = location.state.baseUrl;
	} catch (error) {
		history.push("/")
	}
	
	const questionId = match.params.id

	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)

	const [question, setQuestion] = useState("")
	const [publishedAt, setPublisheAt] = useState("")
	const [choices, setChoices] = useState([])

	//Note: useState expressions can be changed to avoid performance issues which arise from useEffect-useState page render triger
	/*const [inputQuestion, setınputQuestion] = useState({
		question:"",
		publishedAt: "",
		choices:[]
	})*/

	useEffect(() => {
		if(baseUrl === "") {
			history.push("/")
		} else if(questionCount == 0) {
			history.push("/")
		} else {
			fetch(`https://polls.apiblueprint.org${baseUrl}/${questionId}`)
			.then(res => res.json())
			.then((result) => {
					setIsLoaded(true)
					setQuestion(result.question)
					setPublisheAt(result.published_at)
					setChoices(result.choices)
				},
				(error) => {
					setIsLoaded(true)
					setError(error)
				})
		}
	}, [questionId])

	const nextQuestion = () => {
		const nextQuestionId = parseInt(questionId) + 1;
		history.push({
			pathname: `/pooling/${nextQuestionId}`,
			state: {
				questionCount: questionCount,
				baseUrl: baseUrl
			}
		})
	}
		
	if(questionId > questionCount) {
		return <div>End Of pooling</div>
	} else if(error) {
		return <div>Error: {error.message}</div>
	} else if(!isLoaded) {
		return <div>Loading...</div>
	} else {
		return (
			<div>
				<h1>Question Count: {questionCount}</h1>
				<h3>Question: {question}</h3>
				<DateFormatter inputIsoDate={publishedAt}/>
				{choices.map(item => {
					return (
						<Choice
							key={item.choice}
							choice={item.choice}
							votes={item.votes}
							url={item.url}
							baseUrl={baseUrl}
							nextQuestion={nextQuestion}
						/>
					)
				})}
			</div>
		)
	}

}

export default Pooling;
