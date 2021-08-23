import Head from "next/head";
import { Fragment, useState } from "react";
import styles from "../styles/Quiz.module.css";

const questions = [
  {
    questionText: "Which of these is the capital of France?",
    answerOptions: [
      { answerText: "New York", isCorrect: false, index: "A" },
      { answerText: "London", isCorrect: false, index: "B" },
      { answerText: "Paris", isCorrect: true, index: "C" },
      { answerText: "Dublin", isCorrect: false, index: "D" },
    ],
  },
  {
    questionText: "Who is CEO of Tesla?",
    answerOptions: [
      { answerText: "New York", isCorrect: false, index: "A" },
      { answerText: "London", isCorrect: false, index: "B" },
      { answerText: "Paris", isCorrect: true, index: "C" },
      { answerText: "Dublin", isCorrect: false, index: "D" },
    ],
  },
  {
    questionText: "The iPhone was created by which company?",
    answerOptions: [
      { answerText: "New York", isCorrect: false, index: "A" },
      { answerText: "London", isCorrect: false, index: "B" },
      { answerText: "Paris", isCorrect: true, index: "C" },
      { answerText: "Dublin", isCorrect: false, index: "D" },
    ],
  },
  {
    questionText: "How many Harry Potter books are there?",
    answerOptions: [
      { answerText: "New York", isCorrect: false, index: "A" },
      { answerText: "London", isCorrect: false, index: "B" },
      { answerText: "Paris", isCorrect: true, index: "C" },
      { answerText: "Dublin", isCorrect: false, index: "D" },
    ],
  },
];

function Quiz() {
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(0);

  const answerButtonHandler = (isCorrect) => {
    if(isCorrect){
        setScore(score + 1)
    }
    const toggleNextQuestion = currQuestion + 1;
    if (toggleNextQuestion < questions.length) {
      setCurrQuestion(toggleNextQuestion);
    } else {
      setShowScore(true)
    }
  };

  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/sly1ocm.css" />
      </Head>
      <div className={styles["quiz-wrapper"]}>
        {showScore ? (
          <div className={styles.score}>You scored {score} out of {questions.length}</div>
        ) : (
          <Fragment>
            {" "}
            <p className={styles["question-title"]}>
              {questions[currQuestion].questionText}
            </p>
            {questions[currQuestion].answerOptions.map((answerOption, i) => (
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
          </Fragment>
        )}
      </div>
    </Fragment>
  );
}

export default Quiz;
