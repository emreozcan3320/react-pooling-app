import React, {useState} from 'react';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

const Choice = ({choice, votes, url, baseUrl, nextQuestion, totalVotes}) => {
	const [newVotes, setNewVotes] = useState(votes)
	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)

	const percentageOfVotes = (vote) => {
		let totalVotesInt = parseInt(totalVotes);
		let inputVoteInt = parseInt(vote);
		let percentage = (100/totalVotesInt)*inputVoteInt;
		return percentage;

	}

	const postVote = (url) => {
		fetch(`https://polls.apiblueprint.org${url}`, {
			method: 'POST',
			headers: {
				"Content-type": "application/json;"
			}
		}).then((result) => {
			setIsLoaded(true)
			setNewVotes(newVotes + 1)
			nextQuestion()
		}, (err) => {
			setIsLoaded(true)
			setError(err)
		})
	}

	const progressBarColorSetter = (url) => {
		const number = url.slice(-1)
		switch(number) {
			case "1":
				return `success`
			case "2":
				return `info`
			case "3":
				return `warning`
			case "4":
				return `danger`
			default:
				return ``
		}
	}

	return (
		<Col xs={12} md={6} className="choice_col">
			<p className="choice_span">{choice}</p>

			<Badge
				className="choice_badge"
				variant="secondary"
			>{newVotes} of {totalVotes}</Badge>

			<ProgressBar
				variant={progressBarColorSetter(url)}
				now={percentageOfVotes(newVotes)}
				label={newVotes}/>

			<Button
				className="choice_button"
				variant="dark"
				disabled={isLoaded}
				onClick={() => postVote(url)}
			>Vote!</Button>
		</Col>
	)
}

export default Choice;
