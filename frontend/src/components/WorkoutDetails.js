import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutDetails = ({ workout }) => {

    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
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
            <span className="material-symbols-outlined"onClick={handleClick}>close</span>
        </div>

    )
}

export default WorkoutDetails