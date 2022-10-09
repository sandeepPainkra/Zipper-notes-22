const express = require("express");
const mongoose = require("mongoose");
const { DB } = require("./keys");
const PostRouter = require("./Routers/postRouter");
const userRouter = require("./Routers/userRouter");
const cors = require("cors");
const app = express();
const PORT = 5000;

mongoose.connect(
  DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (req, res) => {
    console.log("Connection successfull");
  }
);
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello world!!!");
});

app.use("/user", userRouter);
app.use("/post", PostRouter);
app.listen(PORT, (req, res) => {
  console.log(`server is listening in port no ${PORT}`);
});
