import Head from "next/head";
import { Fragment } from "react";
import styles from "../styles/Quiz.module.css";

function Quiz() {
  return (
    <Fragment>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/sly1ocm.css" />
      </Head>
      <div className={styles["quiz-wrapper"]}>
        <p className={styles["question-title"]}>WHICH IS THE MISSING LINE?</p>
        <p>NE ZNAM</p>
        <div className={styles.choice}>
          <div className={styles["choice-label"]}>
            <span>A</span>
          </div>
          <div className={styles['choice-div']}>asdasdasdasd</div>
        </div>
        <div className={styles.choice}>
          <div className={styles["choice-label"]}>
            <span>B</span>
          </div>
         <div className={styles['choice-div']}>asdasdasdasd</div>
        </div>
      </div>
    </Fragment>
  );
}

export default Quiz;
