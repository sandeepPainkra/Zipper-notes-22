import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { actionTypes } from "../../ContextApi/reducer";
import { useStateValue } from "../../ContextApi/StateProvider";
import "./Profile.css";

const Profile = () => {
  const [state, dispatch] = useStateValue();
  const navigate = useNavigate();

  const LogOUT = () => {
    dispatch({
      type: actionTypes.ClEAR_USER,
      user: null,
    });
    localStorage.clear();
    navigate("/");
  };
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="profile">
      <div className="container">
        <h1>My Profile</h1>

        <hr />

        <div className="profile_container">
          <div className="profile_info">
            <Card className="myCard">
              <CardActionArea>
                <CardMedia
                  className="profile_pic"
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={user?.image}
                  title="Sandeep Painkra"
                />
                <CardContent>
                  <Typography
                    className="myInfo"
                    gutterBottom
                    variant="h5"
                    component="h4"
                  >
                    <span className="title">Name:</span> {user?.name}
                  </Typography>
                  <Typography
                    className="myInfo"
                    gutterBottom
                    variant="h5"
                    component="h4"
                  >
                    <span className="title">Email:</span>
                    {user?.email}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className="profile_btn">
                <NavLink to="/editprofile">
                  <Button size="small" variant="contained" color="primary">
                    Edit Profile
                  </Button>
                </NavLink>
                <Button
                  size="small"
                  onClick={LogOUT}
                  variant="contained"
                  color="secondary"
                >
                  Logout
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
