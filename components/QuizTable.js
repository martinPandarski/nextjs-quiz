import SyntaxHighlighter from "react-syntax-highlighter";
import vs from "react-syntax-highlighter/dist/cjs/styles/hljs/vs";
import styles from "../styles/QuizTable.module.css";
import { motion, AnimatePresence } from "framer-motion";
import QuizQuestion from "./QuizQuestion";
import { useEffect, useState } from "react";

export default function QuizTable({
  answerButtonHandler,
  questions,
  currQuestion,
  showQuestion
}) {


  return (
    <AnimatePresence exitBeforeEnter>
      {showQuestion && (
        <motion.div
          exit={{ y: -1000 }}
          initial={{ x: -250 }}
          animate={{ x: -10 }}
          className={styles["quiz-wrapper"]}
        >
          <QuizQuestion
            answerButtonHandler={answerButtonHandler}
            questions={questions}
            currQuestion={currQuestion}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
