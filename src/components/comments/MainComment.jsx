import React, { useState } from "react";
import styles from "./Comments.module.css";
import Replies from "./Replies";
import axios from "axios";
import { authHeader } from "../../helpers";

const MainComment = ({ data, id }) => {
  const [reply, setReply] = useState("");

  const replyChangeHandler = (e) => {
    const value = e.target.value;
    setReply(value);
  };

  const submitReplyHandler = async (e) => {
    e.preventDefault();
    if (reply) {
      await axios.post(
        `${import.meta.env.VITE_BE_URL}/polls/comment-comment/${id}`,
        { comment: reply, commentId: data._id },
        { headers: authHeader() }
      );
      setReply("");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.comment}>
        <div className={styles.commentUser}>{data.mainComment.userName}</div>
        <div className={styles.commentText}>{data.mainComment.comment}</div>
      </div>
      <div>
        {data?.reComments &&
          data?.reComments?.map((item) => <Replies data={item} />)}
      </div>
      <div>
        <form>
          <input
            className={styles.form}
            type="text"
            value={reply}
            onChange={replyChangeHandler}
            placeholder="Reply..."
          />
          <button
            className={styles.form}
            type="submit"
            onClick={submitReplyHandler}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainComment;
