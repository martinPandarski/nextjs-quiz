import Head from "next/head";
import { MongoClient } from "mongodb";
import { Fragment, useState } from "react";
import styles from "../styles/Quiz.module.css";
import { motion, AnimatePresence } from "framer-motion";

// const questions = [
//   {
//     questionText: "Which of these is the capital of France?",
//     answerOptions: [
//       { answerText: "New York", isCorrect: false, index: "A" },
//       { answerText: "London", isCorrect: false, index: "B" },
//       { answerText: "Paris", isCorrect: true, index: "C" },
//       { answerText: "Dublin", isCorrect: false, index: "D" },
//     ],
//   },
//   {
//     questionText: "Who is CEO of Tesla?",
//     answerOptions: [
//       { answerText: "New York", isCorrect: false, index: "A" },
//       { answerText: "London", isCorrect: false, index: "B" },
//       { answerText: "Paris", isCorrect: true, index: "C" },
//       { answerText: "Dublin", isCorrect: false, index: "D" },
//     ],
//   },
//   {
//     questionText: "The iPhone was created by which company?",
//     answerOptions: [
//       { answerText: "New York", isCorrect: false, index: "A" },
//       { answerText: "London", isCorrect: false, index: "B" },
//       { answerText: "Paris", isCorrect: true, index: "C" },
//       { answerText: "Dublin", isCorrect: false, index: "D" },
//     ],
//   },
//   {
//     questionText: "How many Harry Potter books are there?",
//     answerOptions: [
//       { answerText: "New York", isCorrect: false, index: "A" },
//       { answerText: "London", isCorrect: false, index: "B" },
//       { answerText: "Paris", isCorrect: true, index: "C" },
//       { answerText: "Dublin", isCorrect: false, index: "D" },
//     ],
//   },
// ];

function Quiz(props) {
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(0);
  const [nextQuestion, setNextQuestion] = useState(false);

  const answerButtonHandler = (isCorrect) => {
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
      <div className={styles["quiz-wrapper"]}>
        {showScore ? (
          <div className={styles.score}>
            You scored {score} out of {props.questions.length}
          </div>
        ) : (
          <AnimatePresence>
            <motion.div exit={{ y: -1000, opacity: 0 }}>
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
          </AnimatePresence>
        )}
      </div>
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
