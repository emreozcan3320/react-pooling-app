import React, {useEffect, useState,useContext} from 'react';
import {QuestionsContext} from '../providers/QuestionsContext';


const Menu = ({history}) => {
	const [questionCount] = useContext(QuestionsContext);

	/*const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [baseUrl, setBaseUrl] = useState("")

	useEffect(() => {
		fetch('https://polls.apiblueprint.org/')
		.then(res =>res.json())
		.then((result) => {
				setIsLoaded(true)
				setBaseUrl(result.questions_url)
			},
			(error) => {
				setIsLoaded(true)
				setError(error)
			})
	}, [])*/

	const redirectToPooling = () => {
		history.push({
			pathname: "/pooling/1"
		});
	}

	const redirectToQuestionList = () => {
		history.push({
			pathname: "/questions"
		});
	}

	return (
		<div>
			<button
				className={ questionCount > 0 ? 'unhidden' : 'hidden' }
				onClick={redirectToPooling}
			>Start Pooling || {questionCount}
			</button>

			<button
				onClick={redirectToQuestionList}
			>Question List
			</button>
		</div>
	)

}

export default Menu;
