const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000", "http://localhost:7860"],
    credentials: true
}))

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

/* Serve Frontend in Production/Docker */
const frontendDistPath = path.join(__dirname, "../../Frontend/dist")
app.use(express.static(frontendDistPath))

app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"))
})

module.exports = app