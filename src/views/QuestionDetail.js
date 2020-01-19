import React, {useEffect, useState,Fragment} from 'react';
import DateFormatter from '../components/DateFormatter';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

const QuestionDetail = ({location, history}) => {
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
			question.choices.map((item,index) => {
				html.push(
						<tr key={index}>
							<td>{parseInt(index)+1}</td>
							<td>{item.choice}</td>
							<td>{item.votes}</td>
						</tr>
					
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
		return (
			<Container fluid={false} className="menu_container">
				<Spinner animation="border" role="status" className="page_loading_spinner">
					<span className="sr-only" size="lg">Loading...</span>
				</Spinner>
			</Container>
		)
	} else {
		return (
			<Container>
				<Card className="question_detail_card">
					<Card.Header as="h5">{question.question}
						<Badge className="date_formatter_badge" variant="secondary"><DateFormatter
							inputIsoDate={question.published_at}/></Badge>
					</Card.Header>
					<Card.Body>
						<Table responsive>
						<thead>
							<tr>
								<th>#</th>
								<th>Choice</th>
								<th>Vote</th>
							</tr>
						</thead>
						<tbody>
								{loadChoices(question)}
						</tbody>
						</Table>
						<Button onClick={()=>{history.goBack()}}>Back</Button>
							
					</Card.Body>
				</Card>
			</Container>

			
			
		);
	}

}

export default QuestionDetail;
