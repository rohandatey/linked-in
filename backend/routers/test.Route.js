const express = require("express");
const { testController } = require("../controllers/test.Controller");
const router = express.Router();

router.get("/test-router",testController)

module.exports = router;
