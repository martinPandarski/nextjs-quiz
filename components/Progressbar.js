import React, { useContext, useEffect, useState } from "react";
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
          props.timeOutHandler();

          return 100;
        }
        return Math.min(oldProgress - 3, 100);
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
