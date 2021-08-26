import SyntaxHighlighter from "react-syntax-highlighter";
import vs from "react-syntax-highlighter/dist/cjs/styles/hljs/vs";
import styles from "../styles/QuizQuestion.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function QuizQuestion({questions, currQuestion, answerButtonHandler}) {
  return (
    <div>
      <p className={styles["question-title"]}>
        {questions[currQuestion].questionText}
      </p>
      {questions[currQuestion].isCode && (
        <SyntaxHighlighter language="javascript" style={vs}>
          {questions[currQuestion].additionalText}
        </SyntaxHighlighter>
      )}
      {questions[currQuestion].answerOptions.map((answerOption, i) => (
        <div
          className={styles.choice}
          key={i}
          onClick={() => answerButtonHandler(answerOption.isCorrect)}
        >
          <div className={styles["choice-label"]}>
            <span>{answerOption.index}</span>
          </div>
          <div className={styles["choice-div"]}>{answerOption.answerText}</div>
        </div>
      ))}
    </div>
  );
}
