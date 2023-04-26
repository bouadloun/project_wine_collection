const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");

router.get("/user/signup", (req, res, next) => {
  res.render("user/signup");
});

router.post("/user/signup", (req, res, next) => {
  const { username, email, password } = req.body;

  // Validation
  // Check if username is empty
  if (username === "") {
    res.render("signup", { message: "Username cannot be empty" });
    return;
  }

  if (password.length < 4) {
    res.render("signup", {
      message: "Password has to be minimum 4 characters",
    });
    return;
  }

  // Validation passed
  // Check if username is already taken
  User.findOne({ username: username }).then((userFromDB) => {
    console.log(userFromDB);

    if (userFromDB !== null) {
      res.render("signup", { message: "Username is already taken" });
    } else {
      // Username is available
      // Hash password
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);
      console.log(hash);

      // Create user
      User.create({ username: username, email: email, password: hash })
        .then((createdUser) => {
          console.log(createdUser);
          res.redirect("/user/login");
        })
        .catch((err) => {
          next(err);
        });
    }
  });
});

router.get("/user/login", (req, res, next) => {
  res.render("user/login");
});

router.post("/user/login", (req, res, next) => {
  const { username, password } = req.body;

  // Find user in database by username
  User.findOne({ username }).then((userFromDB) => {
    if (userFromDB === null) {
      // User not found in database => Show login form
      res.render("user/login", { message: "Wrong credentials" });
      return;
    }

    // User found in database
    // Check if password from input form matches hashed password from database
    if (bcrypt.compareSync(password, userFromDB.password)) {
      // Password is correct => Login user
      // req.session is an object provided by "express-session"
      req.session.user = userFromDB;
      res.redirect("/user/profile");
    } else {
      res.render("user/login", { message: "Wrong credentials" });
      return;
    }
  });
});

router.get("/user/logout", (req, res, next) => {
  // Logout user
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
