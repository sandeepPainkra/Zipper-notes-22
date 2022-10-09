import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import "./MyNotes.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../../ContextApi/StateProvider";

const MyNotes = () => {
  const [{ user }, dispatch] = useStateValue();
  const [notes, setNotes] = React.useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/post/mynotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => {
      res.json().then((data) => {
        setNotes(data.notes);
      });
    });
  }, []);

  const deleteNote = (id) => {
    fetch(`http://localhost:5000/post/delete/${id}`, {
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
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(notes);
  return (
    <div className="mynotes">
      <div className="container">
        <h1>Welcome Back {}</h1>
        <hr />
        <NavLink to="/createnote">
          <Button
            className="myButton"
            size="large"
            variant="contained"
            color="primary"
          >
            Create New Notes
          </Button>
        </NavLink>

        <div className="lists">
          {notes.map((note, index) => {
            return (
              <Accordion key={index} className="list">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className="list_heading">
                    <p>{note.title}</p>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ backgroundColor: "#fff" }}>
                  <Typography
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <p> {note.description}</p>

                    <div className="btn_controller">
                      <NavLink to={`/editnote/${note._id}`}>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                        >
                          Edit
                        </Button>
                      </NavLink>

                      <Button
                        onClick={() => {
                          deleteNote(note._id);
                        }}
                        size="small"
                        className="deleteBtn"
                        variant="contained"
                        color="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyNotes;
