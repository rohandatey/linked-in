const express = require("express")
const { signUpController, loginUserController, logoutUserController } = require("../controllers/auth.Controller")
const router = express.Router()

router.post("/signup",signUpController)

router.post("/login",loginUserController)

router.get("/logout",logoutUserController)

module.exports = router