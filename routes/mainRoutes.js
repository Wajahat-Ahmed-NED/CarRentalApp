const express = require("express")
const router = express.Router();
router.use("/auth", require("./appRouter"))

module.exports = router;