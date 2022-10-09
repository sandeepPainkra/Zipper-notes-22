const express = require("express");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const LoginRequire = require("../middleware/LoginRequire");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  const { name, email, password, image } = req.body;
  const isUserExist = await User.findOne({ email: email });
  try {
    if (isUserExist) {
      return res.status(422).json({ status: 422, error: "User already exist" });
    } else if (!name || !email || !password) {
      return res
        .status(422)
        .json({ status: 422, error: "Please fill all fields" });
    } else {
      bcrypt.hash(password, 12).then((hashedpassword) => {
        const user = new User({
          name,
          email,
          password: hashedpassword,
          image: image,
        });
        user
          .save()
          .then((user) => {
            res.status(200).json({
              message: "User saved successfully lets chears up!!!!",
              user,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  } catch (error) {
    console.log(error);
  }
});
// userRouter.post("/signin", (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     if (!email || !password) {
//       res.status(401).json({ message: "Fill all the fields!!" });
//     } else {
//       User.findOne({ email: email }).then((savedUser) => {
//         if (!savedUser) {
//           return res
//             .status(422)
//             .json({ status: 422, error: "Invalid email or password" });
//         }
//         bcrypt
//           .compare(password, savedUser.password)
//           .then((doMatch) => {
//             if (doMatch) {
//               const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
//               const { _id, email, name } = savedUser;
//               res.json({
//                 status: "202",
//                 token,
//                 user: { _id, name, email },
//                 message: "Successfully Login",
//               });
//             } else {
//               res.json({ status: "401", message: "Password does not Match!!" });
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

userRouter.post("/signin", (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(422)
        .json({ status: 422, error: "Please fill all fields" });
    }
    User.findOne({ email: email }).then((savedUser) => {
      if (!savedUser) {
        return res
          .status(422)
          .json({ status: 422, error: "Invalid email or password" });
      }
      bcrypt
        .compare(password, savedUser.password)
        .then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
            const { _id, name, email, image } = savedUser;
            res.json({
              message: "Successfully signed in",
              token,
              user: { _id, name, email, image },
            });
          } else {
            return res.status(422).json({ error: "Password doesn't match!!!" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (error) {
    console.log(error);
  }
});
userRouter.put("/update", LoginRequire, async (req, res) => {
  const { name, email, image } = req.body;
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          name,
          email,
          image,
        },
      },
      { new: true }
    )
      .then((user) => {
        res.status(202).json({ status: "ok", user });
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
});
module.exports = userRouter;
