import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import PollCard from "../PollCard/PollCard";

const Home = () => {
  const dispatch = useDispatch();

  // const getPolls = async () => {
  //   const response = await axios.get(
  //     `${import.meta.env.VITE_BE_URL}/polls/get-polls`,
  //     { headers: authHeader() }
  //   );
  //   // console.log(response);
  //   const data = response.data.data;
  //   // console.log(data);
  //   dispatch(allPollsActions.addPolls(data));
  // };

  // useEffect(() => {
  //   getPolls();
  // }, []);
  const polls = useSelector((state) => state.allPolls.data);
  return (
    <div className={styles.main}>
      {polls && polls.map((item) => (
        <PollCard
          key={item._id}
          id={item._id}
          question={item.question}
          options={item.options}
          userId={item.user}
          voted={item.voted}
        />
      ))}
    </div>
  );
};

export default Home;
