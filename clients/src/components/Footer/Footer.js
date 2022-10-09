import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <p>
        2022 Copyright &copy; <NavLink to="/">Note Zipper</NavLink>
      </p>
    </div>
  );
};

export default Footer;
