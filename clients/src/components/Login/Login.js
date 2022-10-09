import { Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { actionTypes } from "../../ContextApi/reducer";
import { useStateValue } from "../../ContextApi/StateProvider";
import "./Login.css";

const Login = () => {
  const [user, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const InputEvent = (e) => {
    const { name, value } = e.target;
    setInput((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const LoginClickEvent = async (e) => {
    setIsSubmit(true);
    const { email, password } = input;
    if (!email && !password) {
      setIsSubmit(false);
      alert("Please fill all the fields");
    }
    await fetch("http://localhost:5000/user/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error || !data) {
          setIsSubmit(false);
          alert(data.error);
        } else {
          dispatch({
            type: actionTypes.SET_USER,
            user: data.user,
          });
          alert("Login Success");
          setIsSubmit(false);
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));

          navigate("/mynotes");
        }
      });
  };
  return (
    <div className="login">
      <div className="container">
        <h1>Login</h1>

        <hr />

        <form>
          <p className="inputHeading">Email Address</p>
          <input
            value={input.email}
            onChange={InputEvent}
            type="email"
            placeholder="Enter Email Id.."
            name="email"
          />

          <p className="inputHeading">Password</p>
          <input
            value={input.password}
            onChange={InputEvent}
            type="password"
            placeholder="Enter Password.."
            name="password"
          />

          {isSubmit ? (
            <CircularProgress disableShrink />
          ) : (
            <>
              <Button
                type="button"
                onClick={LoginClickEvent}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </>
          )}
          <p>
            Don't have account?<NavLink to="/register">Register</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
