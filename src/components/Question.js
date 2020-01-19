import React from 'react';
import DateFormatter from './DateFormatter'

import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

const Question = ({questions, history}) => {
	let counter = 0;

	if(questions == null) {
		return (
			<Spinner animation="border" role="status" className="pageLoadingSpinner">
				<span className="sr-only" size="lg">Loading...</span>
			</Spinner>
		)
	} else {
		return (
			<Container fluid={false} className="question_list">
				{
					questions.map(question => {
						counter += 1;
						return (
							<Card className="question_card" key={counter}>
								<Card.Header className="question_card_header" as="h5">{counter}. Question
									<Badge className="date_formatter_badge" variant="secondary"><DateFormatter
										inputIsoDate={question.published_at}/></Badge>
								</Card.Header>
								<Card.Body className="question_card_body">
									<Card.Title>{question.question}</Card.Title>
									<Button variant="primary" onClick={() => {
										history.push(question.url)
									}}>Details</Button>
								</Card.Body>
							</Card>
						)
					})
				}
			</Container>
		);


	}
}

export default Question;
