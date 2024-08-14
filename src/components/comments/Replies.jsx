import React from "react";
import styles from "./Comments.module.css";

const Replies = ({ data }) => {
  return (
    <div className={styles.reComment}>
      <div className={styles.reCommentUser}>{data.userName}</div>
      <div className={styles.reCommentText}>{data.comment}</div>
    </div>
  );
};

export default Replies;
