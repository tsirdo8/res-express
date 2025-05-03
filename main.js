const express = require('express')
const userRouter = require('./users/user.route')
const connectToDb = require('./db/connectToDB')
const authRouter = require('./auth/auth.route')
const isAuth = require('./middlewares/isAuth.middleware')
const app = express()
const postRouter = require('./posts/posts.route')
const cors = require("cors")

connectToDb()

app.use(express.json())
app.use(cors())

app.use('/users', isAuth, userRouter)
app.use('/auth', authRouter)
app.use('/posts', isAuth, postRouter)

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(3000, () => {
    console.log(`server running on http://localhost:3000`)
})


// npm i express mongoose bcrypt dotenv jsonwebtoken joi