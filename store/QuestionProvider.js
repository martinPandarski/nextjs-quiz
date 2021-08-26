import { useReducer } from "react";
import QuestionContext from "./QuestionContext";


const defaultQuestionState = {
    currQuestion: 0
};

const questionReducer = (state,action) => {
    if(action.type === 'INCREMENT'){
        const updatedQuestion = state.currQuestion + 1;
        console.log(updatedQuestion)
        return{
            currQuestion: updatedQuestion
        }
    }
    if(action.type === 'RESET'){
        return{
            defaultQuestionState
        }
    }
}

const QuestionProvider = (props) => {
    const [questionState, dispatchQuestionAction] = useReducer(
        questionReducer,
        defaultQuestionState
    );

    const nextQuestionHandler = () => {
        dispatchQuestionAction({type: 'INCREMENT'})
    }
    const resetQuestionsHandler = () => {
        dispatchQuestionAction({type: 'RESET'});
    };

    const questionContext = {
        currQuestion: questionState.currQuestion,
        nextQuestion: nextQuestionHandler,
        resetQuestions: resetQuestionsHandler
    };

    return(
        <QuestionContext.Provider value={questionContext}>
            {props.children}
        </QuestionContext.Provider>
    )
};

export default QuestionProvider