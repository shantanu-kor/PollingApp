import React, { useEffect, useState } from "react";
import PollCard from "../PollCard/PollCard";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Poll.module.css";
import MainComment from "../comments/MainComment";
import axios from "axios";
import { authHeader } from "../../helpers";

const Poll = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [poll, setPoll] = useState(null);
  const [comment, setComment] = useState("");

  const polls = useSelector((state) => state.allPolls.data);
  const myPolls = useSelector((state) => state.myPolls.data);

  console.log(polls, myPolls);

  useEffect(() => {
    let poll = null;
    if (polls.length !== 0) {
      poll = polls.find((item) => {
        return item._id === id;
      });
    } else {
      if (myPolls.length > 0) {
        poll = myPolls.find((item) => item._id === id);
      } else {
        navigate("/profile");
      }
    }
    if (poll) {
      setPoll(poll);
    }
  }, [polls]);

  const commentChangeHandler = (e) => {
    const value = e.target.value;
    setComment(value);
  };

  const postCommentHandler = async (e) => {
    e.preventDefault();
    if (comment) {
      await axios.post(
        `${import.meta.env.VITE_BE_URL}/polls/comment-poll/${id}`,
        { comment },
        { headers: authHeader() }
      );
      setComment("");
    }
  };

  // console.log(poll);

  return (
    <div className={styles.main}>
      <div className={styles.question}>Question: {poll?.question}</div>
      <div className={styles.optionsHeading}>Options: </div>
      <div className={styles.options}>
        {poll?.options?.map((item) => (
          <div className={styles.option} key={item._id}>
            {item.value}
          </div>
        ))}
      </div>
      <div className={styles.question}>Comments</div>
      <div>
        {poll?.comments &&
          poll?.comments?.map((item) => <MainComment data={item} id={id} />)}
      </div>
      <div>
        <form>
          <input
            className={styles.form}
            type="text"
            placeholder="Comment..."
            value={comment}
            onChange={commentChangeHandler}
          />
          <button
            className={styles.form}
            type="submit"
            onClick={postCommentHandler}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Poll;
