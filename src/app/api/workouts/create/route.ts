import { FormProps } from '@/src/components/forms/workoutForm/WorkoutForm';
import { db } from '@/src/db'
import { exercises, workoutDays, workouts } from '@/src/db/schema';
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '../../auth/[...nextauth]/route';
import { eq } from 'drizzle-orm';


export async function POST(req: Request, res: Response) {
    const body: FormProps = await req.json()
    const filteredBody = {
        ...body,
        days: body.days.map(d => {
            return {
                dayName: d.dayName,
                exercises: d.exercises.map(e => {
                    return {
                        exercise: e.exercise,
                        reps: parseInt(e.reps),
                        sets: parseInt(e.sets),
                    }
                })
            }
        })
    }
    const user = await getServerSession(authOptions)
    
    const newWorkout = await db.insert(workouts).values({
        name: filteredBody.title,
        description: filteredBody.description,
        userId: user?.user.id,
    }).returning({id: workouts.id})

    if(!newWorkout){
        return new Response("Failed to create workout🙁", {
            status: 400,
        })
    }

    const filteredWorkoutDays = body.days.map(async (d) => {
        const newWorkoutDay = await db.insert(workoutDays).values({
            dayName: d.dayName,
            workoutId: newWorkout[0].id,
        }).returning({id: workoutDays.id})

        if(!newWorkoutDay){
            const deleteWorkout = db.delete(workouts).where(eq(workouts.id, newWorkout[0].id))
            return new Response("Failed to create workout🙁", {
                status: 400,
            })
        }

        d.exercises.map(async (e) => {
            const newExercise = await db.insert(exercises).values({
                name: e.exercise,
                reps: parseInt(e.reps),
                sets: parseInt(e.sets),
                workoutDayId: newWorkoutDay[0].id
            })
            if(!newExercise){
                const deleteWorkout = db.delete(workouts).where(eq(workouts.id, newWorkout[0].id))
                return new Response("Failed to create workout🙁", {
                    status: 400,
                })
            }
        })
    })

    await Promise.all(filteredWorkoutDays)
    

    return new Response("Successfully created workout")
}
