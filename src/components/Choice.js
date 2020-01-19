import React, {useState} from 'react';

const Choice = ({choice, votes, url, baseUrl}) => {

	const [newVotes, setNewVotes] = useState(votes)

	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)


	const postVote = (url) => {
		var string = `https://polls.apiblueprint.org${baseUrl}/${url}`;
		console.log("basildi")
		/*fetch("https://jsonplaceholder.typicode.com/posts",{
			method:'POST',
			body: JSON.stringify({
				title: 'foo',
				body: 'bar',
				userId: 1
			  }),
			headers:{
				'Accept': 'application/json',
    			'Content-Type': 'application/json',
			}

		}).then(res=>{
			console.log(res)
		})*/
		fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify({
				title: 'foo',
				body: 'bar',
				userId: 1
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then(response => response.json())
		.then((result) => {
				setIsLoaded(true)
				console.log("-----Result----");
				console.log(result)
				setNewVotes(newVotes + 1)
			},
			(error) => {
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
