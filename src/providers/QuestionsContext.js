import React, {useState, createContext} from 'react'

export const QuestionsContext = createContext();

export const QuestionPrivider = props => {     
    const [questionCount, setQuestionCount] = useState(0)
    const [baseUrl, setBaseUrl] = useState("")


    fetch('https://polls.apiblueprint.org/')
    .then(res =>res.json())
    .then((result) => {
            setBaseUrl(result.questions_url)
        })
        
    return(
        <QuestionsContext.Provider value={[questionCount, setQuestionCount, baseUrl]}>
            {props.children}
        </QuestionsContext.Provider>
    );
}



