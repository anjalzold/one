const router = require('express').Router();
const {createUser, loginUser, getUser} = require('../controller/userController');


router.route("/").post(createUser).get(getUser)
router.route("/login").post(loginUser)

module.exports = router