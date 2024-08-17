import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "./components/authenticate/Login";
import Signup from "./components/authenticate/Signup";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import NavBar from "./components/NavBar/NavBar";
import { useContext, useEffect, useState } from "react";
import PageNotFound from "./components/PageNotFound";
import toast, { Toaster } from "react-hot-toast";
import Poll from "./components/Poll/Poll";
import AddPoll from "./components/AddPoll/AddPoll";
import { io } from "socket.io-client";
import SocketContext from "./store/SocketContext";
import { toastOptions } from "./helpers";
import { useDispatch } from "react-redux";
import { allPollsActions } from "./store/allPollsSlice";
import { myPollsActions } from "./store/myPollsSlice";
import axios from "axios";
import { authHeader } from "./helpers";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { socket, newSocketHandler } = useContext(SocketContext);
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    function setAuth() {
      if (localStorage.getItem("token")) {
        newSocketHandler();
        setIsAuth(true);
      } else {
        socket.disconnect();
        setIsAuth(false);
      }
    }
    window.addEventListener("storage", setAuth);
    window.dispatchEvent(new Event("storage"));
    if (!localStorage.getItem("token")) {
      navigate('/login');
    } else {
      navigate(location.pathname);
    }

    return () => {
      window.removeEventListener("storage", setAuth);
    };
  }, []);

  // useEffect(() => {
  //   if (isAuth) {
  //     socket.emit("user_room", localStorage.getItem("userId"));
  //   }
  // }, [isAuth, socket]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const reponse = await axios.get(
          `${import.meta.env.VITE_BE_URL}/polls/user-polls`,
          { headers: authHeader() }
        );
        const data = reponse.data.data;
        dispatch(myPollsActions.addPolls(data));
      } catch (err) {
        console.log(err);
      }
    };
    const getPolls = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BE_URL}/polls/get-polls`,
        { headers: authHeader() }
      );
      // console.log(response);
      const data = response.data.data;
      // console.log(data);
      dispatch(allPollsActions.addPolls(data));
    };
    if (isAuth) {
      fetchPolls();
      getPolls();
    }
  }, [isAuth]);

  useEffect(() => {
    // notify if someone voted on your poll
    socket.on("voted_poll_notify", (data) => {
      toast.success(`Someone voted on poll id: ${data}`, toastOptions);
    });
    // update poll results if someone voted
    socket.on("update_poll_votes", (data1) => {
      const { id, data } = data1;
      console.log(id, data);
      dispatch(allPollsActions.updatePollVotes({ id, data }));
      dispatch(myPollsActions.updatePollVotes({ id, data }));
    });
    // update new poll
    socket.on("new_poll", (data) => {
      dispatch(allPollsActions.addPoll(data));
    });
    // update new poll profile
    socket.on("new_poll_user", (data) => {
      dispatch(myPollsActions.addPoll(data));
      toast.success("New poll added", toastOptions);
    });
    socket.on("new_comment", (data) => {
      dispatch(allPollsActions.addUpdateComment(data));
    });
    socket.on("new_comment_user", (data) => {
      dispatch(myPollsActions.addUpdateComment(data));
      toast.success(`Someone commented on poll id: ${data.pollId}`);
    });
  }, [socket]);

  return (
    <div>
      <NavBar />
      <div className="offsetDiv"></div>
      <Routes>
        {isAuth ? (
          <>
            <Route element={<Home />} path="/" />
            <Route element={<Poll />} path="/polls/:id" />
            <Route element={<Profile />} path="/profile" />
            <Route element={<AddPoll />} path="/add-poll" />
          </>
        ) : (
          <>
            <Route element={<Login />} path="/login" />
            <Route element={<Signup />} path="/signup" />
          </>
        )}
        <Route element={<PageNotFound />} path="/*" />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
