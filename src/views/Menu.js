import React, {useEffect, useState, useContext} from 'react';
import {QuestionsContext} from '../providers/QuestionsContext';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'


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
		return (
			<Container fluid={false} className="menu_container">
				<Spinner animation="border" role="status" className="page_loading_spinner">
					<span className="sr-only" size="lg">Loading...</span>
				</Spinner>
			</Container>
		)
	} else {
		return (
			<Container fluid={false} className="menu_container">
				<Row>
					<Col xs={12} md={12}>
						<Button
							className="menu_pageButton"
							size="lg"
							variant="outline-success"
							onClick={redirectToPooling}
						>Start Pooling
						</Button>
					</Col>
					<Col xs={12} md={12}>
						<Button
							className="menu_pageButton"
							size="lg"
							variant="outline-info"
							onClick={redirectToQuestionList}
						>Question List
						</Button>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Menu;
