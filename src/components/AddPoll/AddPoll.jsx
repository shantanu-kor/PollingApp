import React, { useState } from "react";
import styles from "./AddPoll.module.css";
import axios from "axios";
import { authHeader, toastOptions } from "../../helpers";
import toast from "react-hot-toast";

const AddPoll = () => {
  const [options, setOptions] = useState([""]);
  const [question, setQuestion] = useState("");

  // change question value
  const questionValueHandler = (e) => {
    const value = e.target.value;
    setQuestion(value);
  };

  // add a new option
  const addOptionHandler = () => {
    setOptions((prev) => [...prev, ""]);
  };

  // delete a option
  const deleteOptionHandler = (index) => {
    const values = [...options];
    values.splice(index, 1);
    setOptions(values);
  };

  // change the value of option
  const optionValueHandler = (e, index) => {
    const values = [...options];
    values[index] = e.target.value;
    setOptions(values);
  };

  // add the poll to database
  const addPollHandler = async () => {
    try {
      if (question && options.length > 0) {
        for (let i of options) {
          if (i === "") {
            toast.error("Please fill all options", toastOptions);
            return;
          }
        }
        console.log(options);
        await axios.post(
          `${import.meta.env.VITE_BE_URL}/polls/new-poll`,
          { question, options },
          { headers: authHeader() }
        );
        setOptions([""]);
        setQuestion("");
      } else {
        toast.error("Please fill all fields", toastOptions);
      }
    } catch (err) {
      toast.error("Please refresh before adding another poll", toastOptions);
      console.log(err);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.quesMain}>
        <label htmlFor="question">Question</label>
        <input
          className={styles.input}
          type="text"
          id="question"
          value={question}
          onChange={questionValueHandler}
        />
      </div>
      <div className={styles.optionMain}>
        <div>Options</div>
        <div className={styles.options}>
          {options &&
            options.map((item, index) => (
              <div className={styles.option}>
                <input
                  className={styles.input}
                  type="text"
                  value={item}
                  onChange={(e) => optionValueHandler(e, index)}
                />
                <button className={styles.delete} onClick={deleteOptionHandler.bind(null, index)}>
                  Delete
                </button>
              </div>
            ))}
        </div>
        <button className={styles.addOption} onClick={addOptionHandler}>Add Option</button>
      </div>
      <button className={styles.submit} onClick={addPollHandler}>Add Pool</button>
    </div>
  );
};

export default AddPoll;
