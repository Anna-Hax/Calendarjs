import express from 'express';
import path from 'path'
const __dirname = import.meta.dirname;
const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static("public"))
app.set("view engine", "ejs")

const userRouter = require("./routes/login")

app.use("/", userRouter)

app.listen(3000)