import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutDetails = ({ workout }) => {

    const { dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: { _id: workout._id } })
    }
  }

    

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Weigth (KG): </strong> {workout.weight} </p>
            <p><strong>Reps: </strong> {workout.reps} </p>
            <p><strong>Sets: </strong> {workout.sets} </p>
            <span onClick={handleClick}>Delete</span>
        </div>

    )
}

export default WorkoutDetails