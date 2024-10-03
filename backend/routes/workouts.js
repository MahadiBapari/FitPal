const express = require('express')
const router = express.Router()
const Workout = require('../models/workoutModel')
const {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')



//GET all workouts
router.get('/', getAllWorkouts)

//GET single workout
router.get('/:id', getSingleWorkout)

//POST a workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id',deleteWorkout)

//UPDATE all workouts
router.patch('/:id',updateWorkout)


module.exports = router;