import { Button, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const nevigate = useNavigate();
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [isDataCreated, setIsDataCreated] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const InputEvent = (e) => {
    const { name, value } = e.target;
    setUser((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (url) {
      const { name, email, password, image } = user;

      fetch("http://localhost:5000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          image: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            alert(data.error);
          } else {
            alert("Account Created Successfully");
            nevigate("/login");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  const RegisterAccount = async (e) => {
    e.preventDefault();
    // const { name, email, password, image } = user;

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Zipper-notes");
    data.append("cloud_name", "sandeep678");

    fetch("https://api.cloudinary.com/v1_1/sandeep678/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setUrl(result.url);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(image);
  };
  console.log(url);
  return (
    <div className="register">
      <div className="container">
        <h1>Create Your Account</h1>

        <hr />

        <form onSubmit={RegisterAccount}>
          <p className="inputHeading">Name</p>
          <input
            value={user.name}
            onChange={InputEvent}
            type="text"
            placeholder="Enter Your Name."
            name="name"
          />
          <p className="inputHeading">Email Address</p>
          <input
            value={user.email}
            onChange={InputEvent}
            type="email"
            placeholder="Enter Email Id.."
            name="email"
          />
          <p className="inputHeading">Password</p>
          <input
            value={user.password}
            onChange={InputEvent}
            type="password"
            placeholder="Enter Password.."
            name="password"
          />
          <p className="inputHeading">Profile Pic</p>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            placeholder="choose file"
          />

          {isDataCreated ? (
            <CircularProgress disableShrink />
          ) : (
            <>
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </>
          )}
          <p>
            Allready have account?<NavLink to="/login">Login</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
