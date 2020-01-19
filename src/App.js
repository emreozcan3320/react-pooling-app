import React, { useState } from 'react';
import './App.css';

import Header from './components/Header';
import PageLayout from './components/PageLayout';


function App() {

  const [isWelcomeEnd, setIsWelcomeEnd] = useState(false);
  const [isSurveyEnd, setIsSurveyEnd] = useState(false);

  return (
    <div className="App">
      <Header/>
      <PageLayout
       setIsWelcomeEnd={setIsWelcomeEnd}
       isWelcomeEnd={isWelcomeEnd}
       setIsSurveyEnd={setIsSurveyEnd}
      />
    </div>
  );
}

export default App;
