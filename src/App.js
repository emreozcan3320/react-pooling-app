import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container'


import Routes from './Routes';


function App() {

	//const [isWelcomeEnd, setIsWelcomeEnd] = useState(false);
	//const [isSurveyEnd, setIsSurveyEnd] = useState(false);

	return (
		<Container fluid={true} className="App">
			<Router>
				<Routes/>
			</Router>
		</Container>
	);
}

export default App;
