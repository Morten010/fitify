import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/src/components/ui/card'
import { WorkoutDays, Workouts } from '../db/schema'
import Link from 'next/link'

export default function WorkoutCard({workout}: {workout: Workouts}) {
  return (
   <Link
   href={`/workouts/${workout.id}`}
   >
     <Card
     className={workout.isCopied ? "border-purple-600/25 relative" : ""}
     >
        <CardHeader>
            <CardTitle>{workout.name}</CardTitle>
        </CardHeader>
        <CardContent>
            <CardDescription>
                {workout.isCopied && <div
                className='absolute right-0 top-0 py-2 px-4 rounded text-purple-600/40'
                >
                    Copied
                </div>}
                {workout.description}
            </CardDescription>
        </CardContent>
    </Card>
   </Link>
  )
}
