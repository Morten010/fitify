import WorkoutForm from "@/src/components/forms/workoutForm/WorkoutForm";
import { db } from "@/src/db";
import { Workouts, workouts } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export const revalidate = 0

type EditPageProps = {
  params: {
    id: string
  }
}

export default async function EditPage({params}: EditPageProps) {
    const {id} = params
    

    const workout = await db.query.workouts.findFirst({
        where: eq(workouts.id, parseInt(id)),
        with: {
          days: {
            with: {
              exercises: true
            }
          }
        }
    })
    
    if(!workout) return (
      <div
        className='text-center h-[60vh] grid place-content-center text-foreground/70'
        >
          <h2>
            Could not find the workout
          </h2>
          <p>
          Go back to <Link
          className='underline text-primary/80 underline-offset-4 hover:text-primary'
          href="/"
          >
            the homepage
          </Link>
        </p>
      </div>
    )
    console.log(workout);
    
  return (
    <div
    className='p-3'
    >
        <h1
        className='text-3xl font-semibold mb-3'
        >
            Edit workout
        </h1>
        <WorkoutForm workout={workout!} />
    </div>
  )
}
