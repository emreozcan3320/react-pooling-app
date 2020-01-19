import React, {Fragment} from 'react';
import {Route, Switch, Redirect} from "react-router-dom";

import Header from './components/NavBar/Header';
import Menu from './views/Menu';
import Pooling from './views/Pooling';
import QuestionList from './views/QuestionList';
import QuestionDetail from './views/QuestionDetail';
import QuestionAdd from './views/QuestionAdd';

import {QuestionPrivider} from './providers/QuestionsContext'

const Routes = () => {
	return (
		<Fragment>
			<QuestionPrivider>
				<Header/>
				<Switch>
					<Route path="/" exact component={Menu}></Route>
					<Route path="/pooling/:id" exact component={Pooling}></Route>
					<Route path="/questions" exact component={QuestionList}></Route>
					<Route path="/questions/:id" exact component={QuestionDetail}></Route>
					<Route path="/createQuestion" exact component={QuestionAdd}></Route>
					<Redirect to="/"/>
				</Switch>
			</QuestionPrivider>
		</Fragment>

	);
}

export default Routes;
