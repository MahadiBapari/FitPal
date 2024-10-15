const WorkoutDetails = ({ workout }) => {
    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Weigth (KG): </strong> {workout.weight} </p>
            <p><strong>Reps: </strong> {workout.reps} </p>
            <p><strong>Sets: </strong> {workout.sets} </p>
            <p></p>
        </div>
    )
}

export default WorkoutDetails