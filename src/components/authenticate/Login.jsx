import React, { useState } from "react";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { toastOptions } from "../../helpers";

const Login = () => {
  const [details, setDetails] = useState({ email: "", password: "" });
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  // handle the email change
  const emailChangeHandler = (e) => {
    const email = e.target.value;
    setDetails((prev) => ({ ...prev, email }));
  };
  // handle the password change
  const passwordChangeHandler = (e) => {
    const password = e.target.value;
    setDetails((prev) => ({ ...prev, password }));
  };

  // handle the login
  const loginHandler = async () => {
    setProcessing(true);
    try {
      if (details.email !== "" && details.password !== "") {
        const response = await axios.post(
          `${import.meta.env.VITE_BE_URL}/auth/login`,
          details
        );
        // console.log(response, "response!");
        const token = response.data.token;
        const userId = response.data.data.userId;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        window.dispatchEvent(new Event("storage"));
        setProcessing(false);
        navigate("/profile");
      } else {
        setProcessing(false);
        toast.error("Please enter all the credientails!", toastOptions);
      }
    } catch (err) {
      setProcessing(false);
      toast.error(err.response.data.message, toastOptions);
      // console.log(err);
    }
  };

  return (
    <div className={styles.main}>
      <table>
        <tbody>
          <tr>
            <td className={styles.td}>
              <label className={styles.label} htmlFor="email">
                Email:{" "}
              </label>
            </td>
            <td className={styles.td}>
              <input
                className={styles.input}
                type="email"
                id="email"
                placeholder="Enter your registered Email"
                value={details.email}
                onChange={emailChangeHandler}
              />
            </td>
          </tr>
          <tr>
            <td className={styles.td}>
              <label className={styles.label} htmlFor="password">
                Password:{" "}
              </label>
            </td>
            <td className={styles.td}>
              <input
                className={styles.input}
                type="password"
                id="password"
                placeholder="Enter password"
                value={details.password}
                onChange={passwordChangeHandler}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {processing ? (
        "Please wait"
      ) : (
        <button className={styles.submit} onClick={loginHandler}>
          Login
        </button>
      )}
    </div>
  );
};

export default Login;
