import React, {useState} from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";

import Pooling from './Pooling';
import QuestionList from './QuestionList';

const MainPage = () => {
	const [isStartSurvey, setIsStartSurvey] = useState(false)

	/*if(isStartSurvey) {
		return <Pooling/>
	} else {
		return <QuestionList/>
	}

	/*return (
		<div>
			<button>Start Pooling</button>
			<button>Question List</button>
		</div>
	);*/

	return(
		<BrowserRouter>
			<Route path="/pooling" exact component={Pooling}></Route>
			<Route path="/questions" exact component={QuestionList}></Route>
		</BrowserRouter>
	)

}

export default MainPage;
