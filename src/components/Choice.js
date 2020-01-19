import React, {useState} from 'react';

const Choice = ({choice, votes, url, baseUrl, nextQuestion}) => {
	const [newVotes, setNewVotes] = useState(votes)
	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)

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

	return (
		<div>
			<ul>
				<li>Coice:{choice}</li>
				<li>Votes:{newVotes}</li>
				<li>Url:{url}</li>
				<li>
					<button
						onClick={() => postVote(url)}
					>Vote!
					</button>
				</li>
			</ul>
			<hr></hr>
		</div>
	)
}

export default Choice;
