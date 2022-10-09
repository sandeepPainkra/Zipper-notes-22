import { Button, Menu, MenuItem } from "@material-ui/core";
import React, { useEffect } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useStateValue } from "../../ContextApi/StateProvider";
import "./Header.css";

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    navigate("/profile");
    setAnchorEl(null);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="navbar">
          <NavLink to={true ? "/" : "/login"}>Note Zipper</NavLink>
          <div className="navbar_right">
            {!user ? (
              <NavLink to="/login">Login</NavLink>
            ) : (
              <>
                <div className="afterLoginBtns">
                  <NavLink to="/mynotes">My Notes</NavLink>
                  <div>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleClick}
                    >
                      Open Menu
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                    </Menu>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
