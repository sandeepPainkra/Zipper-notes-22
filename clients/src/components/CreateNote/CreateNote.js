import { Button } from "@material-ui/core";
import React, { useState } from "react";
import "./CreateNote.css";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
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

  const AddNotes = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/post/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        title: input.title,
        description: input.description,
        category: input.category,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data) {
          alert(data.message);
          navigate("/mynotes");
        }
      });
  };
  return (
    <div className="createNotes">
      <div className="container">
        <h1>Create a Note</h1>

        <div className="formContainer">
          <div className="formContainer_heading">
            <p>Create a New Note</p>
          </div>
          <form>
            <p className="inputHeading">Title</p>
            <input
              type="text"
              placeholder="Enter a title.."
              onChange={InputEvent}
              name="title"
            />

            <p className="inputHeading">Content</p>
            <textarea
              onChange={InputEvent}
              name="description"
              id=""
              placeholder="Enter the Description..."
              cols="30"
              rows="3"
            ></textarea>

            <p className="inputHeading">Category</p>
            <input
              type="text"
              onChange={InputEvent}
              name="category"
              placeholder="Enter Category.."
            />

            <p className="inputHeading">Date</p>
            <input type="date" />

            <div className="btn_controller">
              <Button
                size="large"
                onClick={AddNotes}
                variant="contained"
                color="primary"
              >
                Create
              </Button>
              <Button
                size="large"
                className="resetField"
                variant="contained"
                color="danger"
              >
                Reset Field
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
