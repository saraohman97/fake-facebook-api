//imports
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")

//routes
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")

dotenv.config()
mongoose.set('strictQuery', false)

mongoose.connect(
    process.env.MONGO_URL
)
    .then(() => console.log('connected'))
    .catch(e => console.log(e));

//Middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/posts", postRoute)

app.listen(8811, () => {
    console.log("Backend server is running!")
})