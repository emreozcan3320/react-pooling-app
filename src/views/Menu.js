import React, {useEffect, useState, useContext} from 'react';
import {QuestionsContext} from '../providers/QuestionsContext';


const Menu = ({history}) => {
	const [questionCount, setQuestionCount] = useContext(QuestionsContext);
	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [questionList, setQuestionList] = useState([])
	const [baseUrl, setBaseUrl] = useState("")


	useEffect(() => {
		fetch('https://polls.apiblueprint.org/')
		.then(res => res.json())
		.then((result) => {
			setBaseUrl(result.questions_url)
			fetch(`https://polls.apiblueprint.org${result.questions_url}?`)
			.then(res => {
				/*for (var pair of res.headers.entries()) {
					console.log(pair[0]+ ': '+ pair[1]);
				}	*/
				return res.json()
			})
			.then((res) => {
					setIsLoaded(true)
					setQuestionList(res)
					setQuestionCount(res.length)
				},
				(error) => {
					setIsLoaded(true)
					setError(error)
				})
		})
	}, [])


	const redirectToPooling = () => {
		history.push({
			pathname: "/pooling/1",
			state: {
				questionCount: questionCount,
				baseUrl: baseUrl
			}
		});
	}

	const redirectToQuestionList = () => {
		history.push({
			pathname: "/questions",
			state: {
				questionList: questionList
			}
		});
	}

	if(error) {
		return <div>Error: {error.message}</div>
	} else if(!isLoaded) {
		return <div>Loading...</div>
	} else {
		return (
			<div>
				<button
					onClick={redirectToPooling}
				>Start Pooling
				</button>

				<button
					onClick={redirectToQuestionList}
				>Question List
				</button>
			</div>
		)
	}
}

export default Menu;
