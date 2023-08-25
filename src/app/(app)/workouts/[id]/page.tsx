"use client"
import WorkoutsSkeleton from '@/src/components/skeletons/WorkoutsSkeleton'
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card'
import { WorkoutDays, workoutDays } from '@/src/db/schema'
import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import { useQuery } from 'react-query'

export default function page({params}: {
    params: {
        id: string
    }
}) {
    const id = params.id

    const {data: workout, isLoading ,isFetched, isSuccess} = useQuery({
        queryFn: async () => {
          const {data} = await axios.get(`/api/workouts/findone?id=${id}`)
          return data 
        },
    })
    
  return (
    <div
    className='p-3'
    >
        <h1 
        className='text-3xl font-bold md:text-5xl lg:leading-[1.1] text-foreground mb-4'
        >
            {isSuccess && workout.name}
        </h1>
        <p>
            {isSuccess && workout.description}
        </p>
        <div
        className='flex flex-col gap-2 my-4'
        >
            {isSuccess && Array.isArray(workout.days)  && workout.days.map((d: WorkoutDays) => (
                <Link
                href={`/workouts/${workout.id}/${d.id}`}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle
                            className='text-center'
                            >
                                {d.dayName}
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
        {!isSuccess && <WorkoutsSkeleton />}
    </div>
  )
}
