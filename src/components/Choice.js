import React, {useState} from 'react';

const Choice = ({choice, votes, url, baseUrl, nextQuestion}) => {

	const [newVotes, setNewVotes] = useState(votes)

	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)


	const postVote = (url) => {
		var string = `https://polls.apiblueprint.org${url}`;
		console.log(string)
		fetch(string, {
			method: 'POST',
			headers: {
				"Content-type": "application/json;"
			}

		}).then((result) => {
			setIsLoaded(true)
			console.log("-----Success Result----");
			console.log(result)
			setNewVotes(newVotes + 1)
			nextQuestion()
		}, error => {
			console.log("error")
			console.log(error)
			setIsLoaded(true)
			setError(error)
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
