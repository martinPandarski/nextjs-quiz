import styles from "../styles/QuizTable.module.css";
import { motion, AnimatePresence } from "framer-motion";
import QuizQuestion from "./QuizQuestion";
import ProgressBar from "./Progressbar";

export default function QuizTable({
  answerButtonHandler,
  questions,
  currQuestion,
  showQuestion,
  progress,
  setProgress,
  timeOutHandler
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
          <ProgressBar
            progress={progress}
            setProgress={setProgress}
            timeOutHandler={timeOutHandler}
          />
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
