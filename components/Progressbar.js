import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  root: {
    width: "100%",
    color: "#ff3300",
  },
});

export default function ProgressBar(props) {
  const classes = useStyles();
  

  useEffect(() => {
    const timer = setInterval(() => {
      props.setProgress((oldProgress) => {
        if (oldProgress <= 0) {
          const toggleNextQuestion = props.currQuestion + 1;
          console.log(props.currQuestion)
          if (toggleNextQuestion < props.questions.length) {
              console.log('hi')
            props.setCurrQuestion(toggleNextQuestion);
          } else {
            props.setShowScore(true);
          }
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress - diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={classes.root}>
      <LinearProgress
        variant="determinate"
        color="secondary"
        value={props.progress}
      />
    </div>
  );
}
