import { createContext } from "react"

const QuestionContext = createContext({
    currQuestion: 0,
    nextQuestion: () => {},
    resetQuestions: () => {}
})


export default QuestionContext