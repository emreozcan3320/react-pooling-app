import React, {useState, createContext} from 'react'

export const QuestionsContext = createContext();

export const QuestionPrivider = props => {
	const [questionCount, setQuestionCount] = useState(0)

	return (
		<QuestionsContext.Provider value={[questionCount, setQuestionCount]}>
			{props.children}
		</QuestionsContext.Provider>
	);
}



