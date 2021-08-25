import React from "react";
import Link from 'next/link'
import { motion, AnimatePresence } from "framer-motion";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
    hidden: {
        y: "-100vh",
        opacity: 0
    },
    visible: {
        y: "200px",
        opacity: 1,
        transition: {delay: 0.5}
    }
}

export default function Modal({score, allQuestions, setShowScore, setCurrQuestion}) {
    const tryAgainHandler = (e) => {
        e.preventDefault();
        setShowScore(false)
        setCurrQuestion(0)
    }
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        className="backdrop"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
          <motion.div className='modal' variants={modal}>
            <p>You made it to the end!</p>
            <p>Out of {allQuestions} questions you scored {score} right!</p>
            {score < 2 ? <p>You can do better than that!</p> : <p>Well done!</p>}
         <button onClick={tryAgainHandler}>Try again!</button>
          </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}