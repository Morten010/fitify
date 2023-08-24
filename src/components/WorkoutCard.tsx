import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { WorkoutDays, Workouts } from '../db/schema'
import Link from 'next/link'

export default function WorkoutCard({workout}: {workout: Workouts}) {
  return (
   <Link
   href={`/workouts/${workout.id}`}
   >
     <Card>
        <CardHeader>
            <CardTitle>{workout.name}</CardTitle>
        </CardHeader>
        <CardContent>
            <CardDescription>
                {workout.description}
            </CardDescription>
        </CardContent>
    </Card>
   </Link>
  )
}
