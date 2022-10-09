import React from "react";
import "./LandingPage.css";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <div className="landingPage_banner">
        <h1>Welcome to Note Zipper</h1>
        <p>One safe place for all your notes.</p>
        <div className="landingPage_btns">
          <NavLink to="/login">
            <Button
              className="mybutton LoginBtn"
              variant="contained"
              size="large"
              color="primary"
            >
              Login
            </Button>
          </NavLink>
          <NavLink to="/register">
            <Button
              className="mybutton RegisterBtn"
              variant="outlined"
              size="large"
              color="primary"
            >
              Register
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
