import React, {useState, useEffect, useContext} from 'react';
import Choice from "../components/Choice";
import {QuestionsContext} from '../providers/QuestionsContext';

const Pooling = (props) => {
	console.log("Pooling Component")

	const {history, match} = props
	const questionId = match.params.id
	const [questionCount, setQuestionCount, baseUrl] = useContext(QuestionsContext);

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
		} else {
			fetch(`https://polls.apiblueprint.org${baseUrl}/${questionId}`)
			.then(res => res.json())
			.then((result) => {
					setIsLoaded(true)
					setQuestion(result.question)
					setPublisheAt(result.published_at)
					setChoices(result.choices)
					//console.log("-----Result----");
					//console.log(result)
				},
				(error) => {
					setIsLoaded(true)
					setError(error)
				})
		}
	}, [questionId])


	if(error) {
		return <div>Error: {error.message}</div>
	} else if(!isLoaded) {
		return <div>Loading...</div>
	} else {
		return (
			<div>
				<h1>Question Count: {questionCount}</h1>
				<h3>Question: {question}</h3>
				<small>publishedAt:{publishedAt}</small>
				{choices.map(item => {
					return (
						<Choice
							key={item.choice}
							choice={item.choice}
							votes={item.votes}
							url={item.url}
							baseUrl={baseUrl}
						/>
					)
				})}
			</div>
		)
	}

}

export default Pooling;
