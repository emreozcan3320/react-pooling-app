import React,{useState,useEffect,useContext} from 'react';
import {Link} from "react-router-dom";
import {QuestionsContext} from '../providers/QuestionsContext';

const QuestionList = (props) => {
	const {match, location} = props
	const [questionCount, setQuestionCount, baseUrl] = useContext(QuestionsContext);
	

	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		fetch(`https://polls.apiblueprint.org${baseUrl}?`)
		.then(res => {
			/*for (var pair of res.headers.entries()) {
				console.log(pair[0]+ ': '+ pair[1]);
			  }	*/
			return res.json()
		})
		.then((res) => {
				console.log(res)
				setIsLoaded(true)
				setQuestionCount(res.length)

			},
			(error) => {
				setIsLoaded(true)
				setError(error)
			})
	}, [])


	if(error) {
		return <div>Error: {error.message}</div>
	} 
	else if(!isLoaded) {
		return <div>Loading...</div>
	}
	else {
		return (
			<div>
				This is the Question List Component
				<Link to={`/pooling/1`}>/pooling/1</Link>
			</div>
		);
	}
	
}

export default QuestionList;
