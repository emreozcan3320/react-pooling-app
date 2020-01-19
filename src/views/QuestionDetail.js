import React, {useEffect, useState} from 'react';
import DateFormatter from '../components/DateFormatter';

const QuestionDetail = ({location}) => {
	const url = location.pathname;

	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [question, setQuestion] = useState([])


	useEffect(() => {
		fetch(`https://polls.apiblueprint.org${url}`)
		.then(res => res.json())
		.then(
			(result) => {
				setQuestion(result)
				setIsLoaded(true)
			},
			(error) => {
				setIsLoaded(true)
				setError(error)
			}
		)
	}, [])

	const loadChoices = (question) => {
		if(question.choices) {
			const html = [];
			question.choices.map(item => {
				html.push(
					<div key={item.choice}>choice:{item.choice} || votes: {item.votes}</div>
				)
			})
			return html;
		} else {
			return <div>Looding..</div>
		}
	}

	if(error) {
		return <div>Error: {error.message}</div>
	} else if(!isLoaded) {
		return <div>Loading...</div>
	} else {
		return (
			<div>
				<h3>Question:{question.question}</h3>
				<small>Published At:
					<DateFormatter
						inputIsoDate={question.published_at}
					/>
				</small>
				{loadChoices(question)}
			</div>
		);
	}

}

export default QuestionDetail;
