import React, {useState, useEffect, useContext} from 'react'
import Choice from "../components/Choice"
import {QuestionsContext} from '../providers/QuestionsContext'
import DateFormatter from '../components/DateFormatter'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

const Pooling = ({history, match, location}) => {
	const [questionCount, setQuestionCount] = useContext(QuestionsContext);
	let baseUrl = ""
	let totalVotes = 0
	try {
		baseUrl = location.state.baseUrl;
	} catch(error) {
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
		} else if(questionCount === 0) {
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
		return (
			<Container className="end_of_pooling_cantainer">
				<Alert className="end_of_pooling_alert" variant="success">
					<Alert.Heading>This is the end of survey</Alert.Heading>
					<p>
						Aww yeah, you successfully come to the end of survey. This example
						text is going to run a bit longer so that you can see how spacing within an
						alert works with this kind of content.
					</p>
					<hr/>
					<div className="d-flex justify-content-end">
						<Button onClick={() => history.push("/")} variant="outline-success">
							Go to the main page
						</Button>
					</div>
				</Alert>
			</Container>)
	} else if(error) {
		return (
			<Container className="end_of_pooling_cantainer">
				<Alert className="end_of_pooling_alert" variant="danger">
					<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
					<p>Error: {error.message}</p>
					<p>
						Sorry for this error. Please check your internet connection or try again later
					</p>
					<hr/>
					<div className="d-flex justify-content-end">
						<Button onClick={() => history.push("/")} variant="outline-danger">
							Go to the main page
						</Button>
					</div>
				</Alert>
			</Container>
		);
	} else if(!isLoaded) {
		return (
			<Container className="menu_container">
				<Spinner animation="border" role="status" className="page_loading_spinner">
					<span className="sr-only" size="lg">Loading...</span>
				</Spinner>
			</Container>
		)
	} else {
		return (
			<Container className="pooling_page_container">
				<Card className="pooling_page_card">
					<Card.Header as="h5" className="pooling_page_card_header">
						{questionId} of {questionCount}
						<Badge className="date_formatter_badge" variant="secondary"><DateFormatter
							inputIsoDate={publishedAt}/></Badge>
					</Card.Header>
					<Card.Body className="pooling_page_card_body">
						<Card.Title>{question}</Card.Title>
						<hr></hr>
						<Container>
							<Row>
								{choices.map(item => {
									totalVotes += item.votes;
									return (
										<Choice
											key={item.choice}
											choice={item.choice}
											votes={item.votes}
											url={item.url}
											baseUrl={baseUrl}
											nextQuestion={nextQuestion}
											totalVotes={totalVotes}
										/>
									)
								})}
							</Row>
						</Container>
					</Card.Body>
				</Card>
			</Container>

		)
	}

}

export default Pooling;
