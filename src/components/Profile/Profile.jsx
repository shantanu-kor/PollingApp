import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authHeader } from "../../helpers";
import PollCard from "../PollCard/PollCard";

const Profile = () => {
  const navigate = useNavigate();
  const polls = useSelector((state) => state.myPolls.data);

  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BE_URL}/auth/details`,
          { headers: authHeader() }
        );
        // console.log(response, "response!!!");
        setDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    //   const fetchPolls = async () => {
    //     try {
    //       const reponse = await axios.get(
    //         `${import.meta.env.VITE_BE_URL}/polls/user-polls`,
    //         { headers: authHeader() }
    //       );
    //       const data = reponse.data.data;
    //       dispatch(myPollsActions.addPolls(data));
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    fetchDetails();
    //   fetchPolls();
  }, []);

  // add new poll
  const addPollHandler = () => {
    navigate("/add-poll");
  };

  return (
    <div className={styles.main}>
      <img
        className={styles.profilePic}
        src={`data:${details?.picture?.contentType};base64,${details?.picture?.data}`}
      />
      <div>Name: {details?.name}</div>
      <div>Email: {details?.email}</div>
      <button onClick={addPollHandler} className={styles.addPoll}>
        Add Poll
      </button>
      <div className={styles.polls}>
        <div className={styles.headingPolls}>My Polls</div>
        <div className={styles.pollsList}>
          {polls.map((item) => (
            <PollCard
              key={item._id}
              id={item._id}
              question={item.question}
              options={item.options}
              userId={item.user}
              profile={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;