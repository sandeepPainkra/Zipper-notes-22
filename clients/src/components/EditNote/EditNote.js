import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditNote.css";
const EditNote = () => {
  const [input1, setInput1] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
  });
  const id = window.location.pathname.split("/")[2];

  const InputEvent = (e) => {
    const { name, value } = e.target;

    setInput1((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    fetch(`http://localhost:5000/post/mynotes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => {
      res.json().then((data) => {
        setInput1(data.note);
      });
    });
  }, [id]);

  const EditNote = async () => {
    console.log("click");
    await fetch("http://localhost:5000/post/updateNote/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title: input1.title,
        description: input1.description,
        category: input1.category,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          if (data) {
            alert(data.message);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNote = () => {
    fetch("http://localhost:5000/post/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        res.json().then((data) => {
          if (data) {
            alert(data.message);
            navigate("/mynotes");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(id);
  return (
    <div className="editNote">
      <div className="container">
        <h1>Edit Your Note</h1>

        <div className="formContainer">
          <div className="formContainer_heading">
            <p>Edit a New Note</p>
          </div>
          <form>
            <p className="inputHeading">Title</p>
            <input
              onChange={InputEvent}
              value={input1.title}
              type="text"
              placeholder="Enter a title.."
              name="title"
            />

            <p className="inputHeading">Content</p>
            <textarea
              onChange={InputEvent}
              value={input1.description}
              name="description"
              id=""
              placeholder="Enter the Description..."
              cols="30"
              rows="3"
            ></textarea>

            <p className="inputHeading">Title</p>
            <input
              onChange={InputEvent}
              value={input1.category}
              type="text"
              name="category"
              placeholder="Enter Category.."
            />

            <p className="inputHeading">Date</p>
            <input type="date" name="date" />

            <div className="btn_controller">
              <Button
                size="large"
                onClick={EditNote}
                variant="contained"
                color="primary"
              >
                Update Note
              </Button>
              <Button
                onClick={deleteNote}
                size="large"
                className="resetField"
                variant="contained"
                color="danger"
              >
                Delete Note
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
