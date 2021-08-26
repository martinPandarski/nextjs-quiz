// import React, { useContext, useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import LinearProgress from "@material-ui/core/LinearProgress";
// import QuestionContext from "../store/QuestionContext";

// const useStyles = makeStyles({
//   root: {
//     width: "100%",
//     color: "#ff3300",
//   },
// });

// export default function ProgressBar(props) {
//   const classes = useStyles();
//   const questionsContext = useContext(QuestionContext)

//   useEffect(() => {
//     const timer = setInterval(() => {
//       props.setProgress((oldProgress) => {
//         if (oldProgress <= 0) {
            
//           const toggleNextQuestion = questionsContext.currQuestion + 1;
//           if (toggleNextQuestion < props.questions.length) {
//               console.log(questionsContext.currQuestion)
//            questionsContext.nextQuestion()
//           } else {
//             props.setShowScore(true);
//           }
//           return 100;
//         }
//         const diff = Math.random() * 10;
//         return Math.min(oldProgress - diff, 100);
//       });
//     }, 500);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return (
//     <div className={classes.root}>
//       <LinearProgress
//         variant="determinate"
//         color="secondary"
//         value={props.progress}
//       />
//     </div>
//   );
// }
