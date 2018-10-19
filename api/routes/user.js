const express = require(`express`);
const router = express.Router();
const checkAuth = require(`../middleware/check-auth`);
const checkAuthorization = require(`../middleware/check-authorization`);

const UserController = require (`../controllers/user`);

router.post(`/signup`, UserController.user_signup);

router.post(`/login`, UserController.user_login);

router.delete(`/:userId`, checkAuth, checkAuthorization, UserController.user_delete);

module.exports = router;
