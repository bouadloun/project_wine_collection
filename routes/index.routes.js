const express = require("express");
const { isLoggedIn } = require('../middleware/user.logedin');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/user/profile", isLoggedIn, (req, res, next) => {
  const user = req.session.user
  res.render("user/profile", { user: user })
})

module.exports = router;
