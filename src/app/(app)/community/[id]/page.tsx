import ExerciseCard from '@/src/components/ExerciseCard'
import CopyButton from '@/src/components/public/CopyButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { db } from '@/src/db'
import { workouts } from '@/src/db/schema'
import { eq } from 'drizzle-orm'
import React from 'react'

export default async function page({params}: {
    params: {
        id: string
    }
}) {
    const id = parseInt(params.id)
    const workout = await  db.query.workouts.findFirst({
         where: eq(workouts.id, id),
         with: {
            days: {
                with: {
                    exercises: true
                }
            },
            user: true
         }
    })
    console.log(workout);

    //if workout dosent exist
    if(!workout){
        return (
            <p>
                workout do not exist
            </p>
        )
    }
    
    //if workout isn't public
    if(!workout?.public){
        return (
            <p>
                workout is not public
            </p>
        )
    }

  return (
    <div
    className='p-3'
    >
        <div
        className='flex justify-between'
        >
            <h1
            className='text-3xl font-semibold mb-2'
            >
                {workout.name}
            </h1>
            <CopyButton id={id} />
        </div>
        <p
        className='text-foreground mb-4'
        >
            {workout.description}
        </p>
        {workout.days.map(d => (
            <Card>
                <CardHeader>
                    <CardTitle>
                        {d.dayName}
                    </CardTitle>
                </CardHeader>
                <CardContent
                className='flex flex-col gap-3'
                >
                    {d.exercises.map(ex => (
                        <ExerciseCard
                        key={ex.id} 
                        exercise={ex} 
                        publicView
                        />
                    ))}
                </CardContent>
            </Card>
        ))}
    </div>
  )
}
