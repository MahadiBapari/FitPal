require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')

const app = express()

//middleware
app.use(express.json())
 
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts',workoutRoutes)

//connect to db
mongoose.connect(process.env.DB_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log("listening to port ",process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


