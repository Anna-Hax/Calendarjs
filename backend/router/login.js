const express = require("express")
const router = express.Router()

router.use(logger)

router.get("/", (req, res) => {
  console.log(req.query.name)
  res.send("User List")
})