import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.js";
import MyNotes from "./components/MyNotes/MyNotes.js";
import Login from "./components/Login/Login.js";
import Header from "./components/Header/Header.js";
import Register from "./components/Register/Register.js";
import CreateNote from "./components/CreateNote/CreateNote.js";
import EditNote from "./components/EditNote/EditNote.js";
import Profile from "./components/Profile/Profile.js";
import EditProfile from "./components/EditProfile/EditProfile.js";
import Footer from "./components/Footer/Footer.js";
import { useStateValue } from "./ContextApi/StateProvider.js";
import { actionTypes } from "./ContextApi/reducer";

const Routing = () => {
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [{ user }] = useStateValue();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({
        type: actionTypes.SET_USER,
        user: user,
      });
      navigate("/mynotes");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mynotes" element={<MyNotes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createnote" element={<CreateNote />} />
        <Route path="/editnote/:noteId" element={<EditNote />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editprofile" element={<EditProfile />} />
      </Routes>
    </>
  );
};
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routing />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
