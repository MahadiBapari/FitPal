import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {

    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')
    const [sets, setSets] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logged in')
            return
          }

        const workout = {title, weight, reps, sets}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

    const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setTitle('')
            setWeight('')
            setReps('')
            setSets('')
            setError(null)
            
            dispatch({type: 'CREATE_WORKOUTS', payload: json})
        }
    }

    return ( 
        <form className="create" onSubmit = {handleSubmit}>
            <h3>Add a new Workout</h3>

            <label>Workout Title:</label>
            <input
                type="text"
                onChange = {(e) => setTitle(e.target.value)}
                value = {title}

             />

            <label>Weght(in kg):</label>
            <input
                type="number"
                onChange = {(e) => setWeight(e.target.value)}
                value = {weight}

             />

            <label>Reps:</label>
            <input
                type="number"
                onChange = {(e) => setReps(e.target.value)}
                value = {reps}

             />

            <label>Sets:</label>
            <input
                type="text"
                onChange = {(e) => setSets(e.target.value)}
                value = {sets}

             />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
            
        </form>
     );
}
 
export default WorkoutForm;