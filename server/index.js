const fs = require("fs")
const cors = require("cors")
const express = require("express")
const cookieParser = require("cookie-parser");
const { getUser, addUser, allUsers } = require("./util.js");
const app = express()

const PORT = process.env.PORT || 3000;

app.use(cookieParser())
app.use(express.json())
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:4173"], credentials: true }))

app.options("*", cors())

app.post("/login", function (req, res) {
  const { username, password } = req.body

  const user = getUser(username)

  if (user && user.password === password) {
    res.cookie("myCookie", `assume this is jwt token, username::${username}`)
    return res.json({
      success: true,
      username
    })
  }
  return res.status(401).json({
    success: false,
    error: "invalid user"
  })
})

app.post("/register", function (req, res) {
  const { username, password } = req.body

  const user = getUser(username)
  if (user) {
    return res.status(400).json({
      success: false,
      error: "user already exists"
    })
  }

  addUser({ username, password })
  return res.json({
    success: true,
    username
  })
})

app.get("/log-out", function (req, res) {
  res.clearCookie("myCookie")
  return res.json({
    success: true,
    message: "sucessfully logged out"
  })
})

app.listen(PORT, () => console.log("server is running at PORT", PORT))
