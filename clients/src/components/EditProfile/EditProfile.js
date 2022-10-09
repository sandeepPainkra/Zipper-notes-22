import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { useStateValue } from "../../ContextApi/StateProvider";
import "./EditProfile.css";
import { actionTypes } from "../../ContextApi/reducer";

const EditProfile = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState({
    name: user?.name,
    email: user?.email,
  });

  const InputEvent = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const UpdateUser = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log(data);
          localStorage.setItem("user", JSON.stringify(data.user));
          const user = JSON.parse(localStorage.getItem("user"));
          if (user) {
            dispatch({
              type: actionTypes.SET_USER,
              user: user,
            });
          }
          navigate("/profile");
        }
      })
      .catch((err) => console.log(err));
  };

  console.log(user);
  return (
    <div className="editProfile">
      <div className="container">
        <h1>Edit My Profile</h1>

        <hr />

        <form onSubmit={UpdateUser}>
          <p className="inputHeading">Name</p>
          <input
            type="text"
            onChange={InputEvent}
            value={input.name}
            placeholder="Enter Your Name."
            name="name"
          />

          <p className="inputHeading">Email Address</p>
          <input
            type="email"
            onChange={InputEvent}
            value={input.email}
            placeholder="Enter Email Id.."
            name="email"
          />

          <p className="inputHeading">Profile Pic</p>
          <input type="file" placeholder="choose file" />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
