const express = require("express")
const app = express()
const keys = require("./config/keys.json")
const passport = require("passport")
const path = require("path")

const cookieSession = require("cookie-session")
const cookieParser = require("cookie-parser")

require("./models/user")
require("./models/googleid")

const connectDB = require("./config/db")
require("./services/passport")
connectDB()
app.use(cookieParser())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json({ extended: false }))

app.get("/welcome", (req, res) => {
  res.send("welcome venkat")
})

app.use("/register", require("./routes/register"))
app.use("/login", require("./routes/login"))
app.use("/", require("./routes/auth"))
app.use("/", require("./routes/sms"))

const PORT = process.env.PORT || 5000
app.listen(() => `Server is running on port ${PORT}`)

app.listen(PORT, () => console.log(`Port is running ${PORT}`))

app.post("/venky", (req, res) => {
  console.log(req.body)
  res.send("hello post request")
})
app.get("/venky", (req, res) => {
  res.send("hello get request")
})

/*


app.get("/", (req, res) => {
  res.render("index.ejs")
})

const expressLayouts = require("express-ejs-layouts")
// app.use(express.static(path.join(__dirname, "public")))

//inite middleware expresslayout EJS

// app.set("view engine", "ejs")


*/
