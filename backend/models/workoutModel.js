const mongoose = require('mongoose')

const schema = mongoose.Schema

const workoutSchema = new schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
    },
    user_id: {
      type: String,
      required: true
    }
    
 
}, {timestamps: true})

module.exports = mongoose.model('Workouts', workoutSchema)