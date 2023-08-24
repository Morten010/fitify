import WorkoutForm from "@/src/components/forms/workoutForm/WorkoutForm";

export default function page() {
    
  return (
    <div
    className='p-3'
    >
        <h1
        className='text-3xl font-semibold mb-3'
        >
            Create Workout
        </h1>
        <WorkoutForm />
    </div>
  )
}
