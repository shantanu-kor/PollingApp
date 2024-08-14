import React, { useContext, useState } from "react";
import { authHeader } from "../../helpers";
import styles from "./PollCard.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SocketContext from "../../store/SocketContext";
import axios from "axios";

const PollCard = ({ id, question, options, userId, voted, profile }) => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [option, setOption] = useState(null);

  // submit the vote
  const votePollHandler = async (e) => {
    e.stopPropagation();
    try {
      if (!localStorage.getItem("userId")) {
        toast.error("Please login to vote");
        return;
      }
      if (option !== null || undefined) {
        // add vote to database
        await axios.post(
          `${import.meta.env.VITE_BE_URL}/polls/vote-poll/${id}`,
          { optionId: option },
          { headers: authHeader() }
        );

        // show the user that I voted for the poll
        socket.emit("voted_poll", { poll_userId: userId, pollId: id });
      } else {
        toast.error("Select an option");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // select a option
  const selectOptionHandler = (id) => {
    setOption(id);
  };

  // get poll details
  const showPollHandler = () => {
    navigate(`/polls/${id}`);
  };

  return (
    <div className={styles.main} onClick={showPollHandler}>
      {/* <div className={styles.poll}> */}
      <div className={styles.question}>{question}</div>
      <div className={styles.options}>
        {options &&
          options.map((item, index) => (
            <div
              className={`${styles.option} ${
                item?.voted && styles.selectedOption
              }`}
              key={index}
              onClick={(e) => e.stopPropagation()}
            >
              {profile || voted ? (
                <span className={styles.votes}>{item?.votes}</span>
              ) : (
                <input
                  type="radio"
                  id={`${id}${index}`}
                  checked={item?._id === option}
                  onChange={(e) => {
                    e.stopPropagation();
                    selectOptionHandler(item?._id);
                  }}
                />
              )}
              <label htmlFor={`${id}${index}`}>{item.value}</label>
            </div>
          ))}
      </div>
      {!voted && !profile && (
        <button className={styles.submit} onClick={votePollHandler}>
          Vote
        </button>
      )}
      {/* </div> */}
    </div>
  );
};

export default PollCard;
