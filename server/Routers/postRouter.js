const express = require("express");
const Post = require("../Models/Post");
const LoginRequire = require("../middleware/LoginRequire");
const PostRouter = express.Router();

PostRouter.post("/create", LoginRequire, (req, res) => {
  const { title, description, category, date } = req.body;

  try {
    if (!title || !description || !category) {
      return res.status(401).json({ error: "Please fill all the field!!!" });
    }

    const newPost = new Post({
      title,
      description,
      category,
      createdBy: req.user,
      date: new Date(),
    });

    newPost
      .save()
      .then((data) => {
        return res
          .status(202)
          .json({ message: "Create Post Successfully", data });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

PostRouter.get("/mynotes", LoginRequire, (req, res) => {
  const { createdBy } = req.user;
  try {
    Post.find({ createdBy: req.user._id })
      .populate("createdBy", "_id name")
      .then((notes) => {
        return res.status(202).json({ message: "ok", notes });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});
PostRouter.get("/mynotes/:notId", LoginRequire, (req, res) => {
  const { notId } = req.params;
  try {
    Post.findById(notId)
      .then((note) => {
        return res.status(200).json({ message: "ok", note });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});

PostRouter.put("/updateNote/:noteId", LoginRequire, async (req, res) => {
  // const { id } = req.params.noteId;
  const { title, description, category, date } = req.body;

  try {
    await Post.findByIdAndUpdate(
      req.params.noteId,
      {
        $set: { title, description, category, date: new Date() },
      },
      { new: true },
      (err, note) => {
        if (err) {
          return res.status(401).json(err);
        } else {
          return res.json({
            message: "updated successfully",
            note,
            status: "202",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});

PostRouter.delete("/delete/:noteId", LoginRequire, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.noteId, (err, note) => {
      if (err) {
        res.status(403).json({ message: "Unable to delete!!" });
      } else {
        res.status(202).json({ message: "Successfull deleted", note });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = PostRouter;
