import Head from "next/head";
import { MongoClient } from "mongodb";
import { Fragment, useState } from "react";
import Modal from "../components/Modal";
import QuizTable from "../components/QuizTable";


function Quiz(props) {
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(0);
  const [showQuestion, setShowQuestion] = useState(true);


  const answerButtonHandler = (isCorrect) => {
    setShowQuestion(false)
    if (isCorrect) {
      setScore(score + 1);
    }
    const toggleNextQuestion = currQuestion + 1;
    if (toggleNextQuestion < props.questions.length) {
      setCurrQuestion(toggleNextQuestion);
    } else {
      setShowScore(true);
    }
    setTimeout(() => {
      setShowQuestion(true)   
    }, 2000);
  };

  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/sly1ocm.css" />
      </Head>
          {showScore ? (
            <Modal
              score={score}
              allQuestions={props.questions.length}
              setShowScore={setShowScore}
              setCurrQuestion={setCurrQuestion}
              setScore={setScore}
            />
          ) : (
            <QuizTable showQuestion={showQuestion} answerButtonHandler={answerButtonHandler} currQuestion={currQuestion} questions={props.questions}/>  
          )}
    </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://marto65481:martok12@cluster0.4jhxq.mongodb.net/quiz?retryWrites=true&w=majority"
  );

  const db = client.db();

  const quizCollection = db.collection("quiz");

  const quizQuestions = await quizCollection.find().toArray();

  client.close();

  return {
    props: {
      questions: quizQuestions.map((question) => ({
        questionText: question.questionText,
        answerOptions: question.answerOptions,
        id: question._id.toString(),
        isCode: question.isCode.toString(),
        additionalText: question.additionalText || ''
      })),
    },
    revalidate: 1,
  };
}
export default Quiz;
