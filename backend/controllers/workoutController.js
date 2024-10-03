const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//create new workout

const createWorkout = async (req, res) => {
    const{title, reps, sets, weight} = req.body

    try {
        const workout = await Workout.create({title, reps, sets, weight})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//get all workout
const getAllWorkouts = async (req,res) => {
    const workouts = await Workout.find({})
    res.status(200).json(workouts)
}


//get single workout
const getSingleWorkout = async (req,res) => {
    const{id} = req.params

    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'Workout not found'})
        }
    
        const workout = await Workout.findById(id)
    
        if(!workout){
            return res.status(404).json({error: 'Workout not found'})
    
        }
    
        res.status(200).json(workout)

    } catch (error) {
        res.status(500).json({error: error.message})
    }

    
}


//delete a workout
const deleteWorkout = async(req, res) => {
    const{id} = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'Workout not found'})
        }
    
        const workout = await Workout.findByIdAndDelete(id)
    
        if(!workout){
            return res.status(404).json({error: 'Workout not found'})
    
        }
    
        res.json({mssg:'Workout deleted'})

    } catch (error) {
        res.status(500).json({error: error.message})
    }

}


//update a workout
const updateWorkout = async(req, res) => {
    const{id} = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: 'Workout not found'})
        }
    
        const workout = await Workout.findByIdAndUpdate(id, {
            ...req.body
        })
    
        if(!workout){
            return res.status(404).json({error: 'Workout not found'})
    
        }
    
        res.status(200).json(workout)

    } catch (error) {
        res.status(500).json({error: error.message})
    }

}




module.exports = {
    createWorkout,
    getAllWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}