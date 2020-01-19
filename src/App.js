import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";
import './App.css';


import Routes from './Routes';



function App() {

  //const [isWelcomeEnd, setIsWelcomeEnd] = useState(false);
  //const [isSurveyEnd, setIsSurveyEnd] = useState(false);

  return (
    <div className="App">
      <Router>
           <Routes/> 
      </Router>
    </div>
  );
}

export default App;
