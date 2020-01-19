import React, {useEffect, useState} from 'react';

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

	const deneme = (question) => {
		if(question.choices) {
			const html = [];
			question.choices.map(item => {
				html.push(
					<div key={item.choice}>choice:{item.choice} || votes: {item.votes}</div>
				)
			})
			return html;
		} else {
			return <div>Fuck</div>
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
				<small>Published At:{question.published_at}</small>
				{deneme(question)}
			</div>
		);
	}

}

export default QuestionDetail;
/* {question.choices.map(choice=>{
                return(
                    <div>
                        <p>Choice:{choice.choice} || Vote:{choice.votes}</p>
                    </div>
                    
                )
            })}*/
