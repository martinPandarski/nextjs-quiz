import Head from "next/head";
import ProgressBar from "../components/Progressbar";
import { MongoClient } from "mongodb";
import { Fragment, useState } from "react";
import styles from "../styles/Quiz.module.css";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../components/Modal";

function Quiz(props) {
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(0);
  const [progress, setProgress] = useState(100);


  const answerButtonHandler = (isCorrect) => {
    setProgress(100)
    if (isCorrect) {
      setScore(score + 1);
    }
    const toggleNextQuestion = currQuestion + 1;
    if (toggleNextQuestion < props.questions.length) {
      setCurrQuestion(toggleNextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/sly1ocm.css" />
      </Head>
        <AnimatePresence exitBeforeEnter>
      <div className={styles["quiz-wrapper"]}>
        {showScore ? (
          <Modal  score={score} allQuestions={props.questions.length} setShowScore={setShowScore} setCurrQuestion={setCurrQuestion}/>
        ) : (
          <motion.div exit={{ y: -1000, opacity: 0 }}>
              <ProgressBar setProgress={setProgress} progress={progress} setShowScore={setShowScore} questions={props.questions} currQuestion={currQuestion} setCurrQuestion={setCurrQuestion}/>
              {" "}
              <p className={styles["question-title"]}>
                {props.questions[currQuestion].questionText}
              </p>
              {props.questions[currQuestion].answerOptions.map((answerOption, i) => (
                <div
                  className={styles.choice}
                  key={i}
                  onClick={() => answerButtonHandler(answerOption.isCorrect)}
                >
                  <div className={styles["choice-label"]}>
                    <span>{answerOption.index}</span>
                  </div>
                  <div className={styles["choice-div"]}>
                    {answerOption.answerText}
                  </div>
                </div>
              ))}
            </motion.div>
        )}
      </div>
        </AnimatePresence>
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
      questions: quizQuestions.map(question => ({
        questionText: question.questionText,
        answerOptions: question.answerOptions,
        id: question._id.toString()
      })),
    },
    revalidate: 1
  };
}
export default Quiz;
